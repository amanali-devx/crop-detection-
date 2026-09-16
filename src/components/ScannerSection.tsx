import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UploadCloud,
  Camera,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Share2,
  FileText,
  ShieldAlert,
  Leaf,
  Clock,
  Check,
  ChevronRight,
  Video,
  VideoOff,
  Crosshair,
  ShieldCheck,
  Ban,
  ScanLine,
  AlertCircle,
} from 'lucide-react';
import { PredictionResult, SampleLeaf } from '../types';
import { SAMPLE_LEAVES } from '../data/mockData';
import { detectCropDisease } from '../services/aiDetection';
import { saveNewScanToHistory } from '../data/dashboardData';
import { FarmerDiseaseSolutionGuide } from './FarmerDiseaseSolutionGuide';

interface ScannerSectionProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  autoStartCamera?: boolean;
  onCameraStarted?: () => void;
  onScanComplete?: (result: PredictionResult) => void;
}

export const ScannerSection = ({ onShowToast, autoStartCamera, onCameraStarted }: ScannerSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_LEAVES[0].imageUrl);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [selectedSample, setSelectedSample] = useState<SampleLeaf | null>(SAMPLE_LEAVES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [activeTreatmentTab, setActiveTreatmentTab] = useState<'organic' | 'chemical' | 'prevention'>('organic');
  const [isDragOver, setIsDragOver] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isNonCropTest, setIsNonCropTest] = useState(false);
  const [shutterFlash, setShutterFlash] = useState(false);

  // Live Camera Viewfinder State
  const [isLiveCameraActive, setIsLiveCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fallbackCameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Clean up media stream on unmount
  useEffect(() => {
    return () => {
      stopLiveCamera();
    };
  }, []);

  // Whenever autoStartCamera prop is passed, start the camera immediately
  useEffect(() => {
    if (autoStartCamera) {
      startLiveCamera('environment');
      onCameraStarted?.();
    }
  }, [autoStartCamera]);

  // Bind mediaStream to videoRef as soon as video element mounts
  useEffect(() => {
    if (isLiveCameraActive && videoRef.current && mediaStreamRef.current) {
      videoRef.current.srcObject = mediaStreamRef.current;
      videoRef.current.play().catch((err) => console.warn('Video play error:', err));
    }
  }, [isLiveCameraActive]);

  // Stop camera helper
  const stopLiveCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsLiveCameraActive(false);
  };

  // Start live camera stream directly on screen
  const startLiveCamera = async (mode: 'environment' | 'user' = facingMode) => {
    stopLiveCamera();
    setCameraError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera streaming API is not supported in this browser.');
      }

      let stream: MediaStream;
      try {
        const constraints: MediaStreamConstraints = {
          video: {
            facingMode: { ideal: mode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (idealErr) {
        console.warn('Ideal constraint failed, retrying with fallback video: true', idealErr);
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      mediaStreamRef.current = stream;
      setIsLiveCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((err) => console.warn('Video play error:', err));
      }

      onShowToast('info', 'Live Camera Activated', 'Position the crop leaf inside the green targeting box.');
    } catch (err: any) {
      console.error('Failed to start camera:', err);
      setIsLiveCameraActive(false);
      setCameraError(
        'Camera permission was not granted or camera device is busy. You can use native phone camera or browse an image.'
      );
      onShowToast('error', 'Camera Access Denied', 'Please allow camera permission in your browser or use native camera.');
    }
  };

  // Direct Live Screen Capture & Immediate AI Scan
  const handleDirectScreenScan = () => {
    if (!videoRef.current || !canvasRef.current) {
      onShowToast('error', 'Camera Error', 'Camera feed not ready for capture.');
      return;
    }

    // Trigger visual shutter flash
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 200);

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const capturedDataUrl = canvas.toDataURL('image/jpeg', 0.92);

    // Stop camera feed and load image
    stopLiveCamera();
    setSelectedImage(capturedDataUrl);
    setCurrentFile(null);
    setSelectedSample(null);
    setIsNonCropTest(false);

    onShowToast('info', 'Leaf Captured', 'Running instant AI disease diagnosis on real camera scan...');

    // Automatically trigger detection on captured image
    runDiagnosis(capturedDataUrl, null, false);
  };

  // Trigger Detection
  const handleDetect = async () => {
    if (!selectedImage && !currentFile) {
      onShowToast('info', 'Select an Image', 'Please upload a leaf image or pick a specimen below.');
      return;
    }
    const source = currentFile || selectedImage || '';
    runDiagnosis(source, selectedSample, isNonCropTest);
  };

  const runDiagnosis = async (
    source: string | File,
    sample: SampleLeaf | null,
    nonCropTestFlag: boolean
  ) => {
    setIsAnalyzing(true);
    setPrediction(null);

    try {
      const result = await detectCropDisease(source, sample, nonCropTestFlag);
      setPrediction(result);

      if (result.isCropImage === false) {
        onShowToast(
          'error',
          'Non-Crop Subject Detected',
          'Only agricultural crops and plant leaves are analyzed. Human/non-plant subjects are rejected.'
        );
      } else {
        // Save scan to dashboard history and broadcast update
        try {
          saveNewScanToHistory(result);
          window.dispatchEvent(new Event('farmerdetect_scan_saved'));
        } catch {
          // Ignore storage errors
        }

        if (result.isHealthy) {
          onShowToast('success', 'Healthy Leaf Confirmed!', 'Vibrant chlorophyll vitality with zero disease detected.');
        } else {
          onShowToast('success', `Diagnosis: ${result.diseaseName}`, `Model confidence: ${result.confidence}%`);
        }
      }
    } catch (err) {
      console.error(err);
      onShowToast('error', 'Detection Error', 'Failed to process the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processNewFile(file);
    }
  };

  // Process a selected or dropped file
  const processNewFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      onShowToast('error', 'Invalid Format', 'Please upload a standard image file (PNG, JPG, JPEG, WEBP).');
      return;
    }
    stopLiveCamera();
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setCurrentFile(file);
      setSelectedSample(null);
      setPrediction(null);
      setIsNonCropTest(false);
      onShowToast('info', 'Image Loaded', `Ready to detect: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processNewFile(e.target.files[0]);
    }
  };

  const handleSelectSample = (sample: SampleLeaf) => {
    stopLiveCamera();
    setSelectedImage(sample.imageUrl);
    setSelectedSample(sample);
    setCurrentFile(null);
    setPrediction(null);
    setIsNonCropTest(false);
    onShowToast('info', 'Specimen Loaded', `Selected ${sample.crop} - ${sample.condition}`);
  };

  // Test Non-Crop Guard feature (Loads a human portrait so the user can verify rejection)
  const handleTestNonCropGuard = () => {
    stopLiveCamera();
    const nonCropUrl =
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
    setSelectedImage(nonCropUrl);
    setSelectedSample(null);
    setCurrentFile(null);
    setPrediction(null);
    setIsNonCropTest(true);
    onShowToast('info', 'Test Human / Non-Crop Image Loaded', 'Click "Run AI Disease Diagnosis" to verify AI rejection guard!');
  };

  const handlePrintReport = () => {
    window.print();
    onShowToast('success', 'Report Exported', 'Opening browser print dialog for diagnostic advisory report.');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
      onShowToast('success', 'Link Copied', 'Diagnosis share link copied to clipboard.');
    }
  };

  return (
    <section id="scanner" className="py-20 bg-slate-50 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Crop-Only Vision AI • Direct Live Screen Scanner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Analyze Plant Pathology in Real-Time
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Directly scan a crop leaf via live camera or upload a field photograph. Our neural model is 
            strictly trained to detect <strong>agricultural crops only</strong> and rejects human, animal, 
            or non-crop imagery to prevent false diagnoses.
          </p>
        </div>

        {/* Interactive Workspace Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Top Quick-Preset Selector Ribbon */}
          <div className="bg-slate-100/80 p-4 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                Quick Field Specimens (1-Click Real Crops):
              </span>
              <span className="text-xs text-slate-500">
                Click any real crop or test the non-crop guard
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
              {SAMPLE_LEAVES.map((sample) => {
                const isSelected = selectedSample?.id === sample.id && !isNonCropTest;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left border transition-all duration-200 group ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-2 ring-emerald-400/30'
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={sample.imageUrl}
                      alt={sample.crop}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 truncate">{sample.crop}</div>
                      <div
                        className={`text-[10px] truncate ${
                          sample.type === 'Healthy' ? 'text-emerald-600 font-semibold' : 'text-slate-500'
                        }`}
                      >
                        {sample.condition.split('(')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* NON-CROP GUARD TEST BUTTON */}
              <button
                type="button"
                onClick={handleTestNonCropGuard}
                className={`flex items-center gap-2 p-2 rounded-xl text-left border transition-all duration-200 group ${
                  isNonCropTest
                    ? 'bg-rose-50 border-rose-500 shadow-sm ring-2 ring-rose-400/30'
                    : 'bg-white border-rose-200 hover:border-rose-400 hover:bg-rose-50/50'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center shrink-0 text-rose-600 font-bold">
                  <Ban className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-rose-900 truncate">Test Non-Crop</div>
                  <div className="text-[10px] text-rose-600 font-medium truncate">Human / Reject Test</div>
                </div>
              </button>
            </div>
          </div>

          {/* Main Grid: Viewfinder / Live Camera on Left, Diagnosis Output on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left Column: Image / Live Camera Viewfinder */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div>
                {/* Viewfinder Mode Switcher Tabs */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => stopLiveCamera()}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                        !isLiveCameraActive
                          ? 'bg-white text-emerald-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Photo Viewfinder</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => startLiveCamera('environment')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                        isLiveCameraActive
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-emerald-700'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Direct Screen Camera</span>
                    </button>
                  </div>

                  {selectedImage && !isLiveCameraActive && (
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setSelectedSample(null);
                        setCurrentFile(null);
                        setPrediction(null);
                        setIsNonCropTest(false);
                      }}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition"
                    >
                      Clear Image
                    </button>
                  )}
                </div>

                {/* Viewport Box (either Live Camera or Static Image) */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden flex flex-col items-center justify-center min-h-[320px] sm:min-h-[380px] bg-slate-900 ${
                    isDragOver
                      ? 'border-emerald-500 bg-emerald-950/20'
                      : isLiveCameraActive
                      ? 'border-emerald-400'
                      : selectedImage
                      ? 'border-emerald-300'
                      : 'border-slate-300 bg-slate-50 hover:border-emerald-400'
                  }`}
                >
                  {/* 1. LIVE CAMERA FEED */}
                  {isLiveCameraActive ? (
                    <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] flex items-center justify-center overflow-hidden">
                      {shutterFlash && (
                        <div className="absolute inset-0 bg-white z-20 pointer-events-none animate-fade-out opacity-90 transition-opacity" />
                      )}
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full min-h-[320px] sm:min-h-[380px] object-cover"
                      />

                      {/* Live HUD Overlay */}
                      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold border border-emerald-500/40 shadow-sm">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                            <span>● LIVE CROP SCANNER</span>
                          </div>
                          <span className="text-[10px] text-white/90 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700">
                            पत्ती को बॉक्स में रखें (Aim leaf at box)
                          </span>
                        </div>

                        {/* Central Target Reticle Box */}
                        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-2xl border-2 border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.35)] flex items-center justify-center">
                          {/* Animated Scan Laser Line */}
                          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] animate-pulse" />
                          <div className="text-[11px] font-bold text-emerald-300 bg-slate-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                            🌿 Align Leaf Here
                          </div>

                          {/* Corner Markers */}
                          <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-emerald-400 rounded-tl-sm" />
                          <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-emerald-400 rounded-tr-sm" />
                          <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-emerald-400 rounded-bl-sm" />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-emerald-400 rounded-br-sm" />
                        </div>

                        <div className="text-center">
                          <span className="text-xs text-white font-semibold bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-500/30">
                            नीचे 'Capture & Direct Scan' बटन दबाएं
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : cameraError ? (
                    /* CAMERA ERROR FALLBACK BANNER */
                    <div className="p-6 text-center space-y-4 bg-slate-900 text-white w-full h-full flex flex-col items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
                        <AlertCircle className="w-7 h-7" />
                      </div>
                      <div className="space-y-1.5 max-w-sm">
                        <h4 className="text-sm font-bold text-white">Camera Permission / Access Issue</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {cameraError}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => fallbackCameraInputRef.current?.click()}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition flex items-center gap-1.5"
                        >
                          <Camera className="w-4 h-4" />
                          <span>Use Phone Camera App</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => startLiveCamera('environment')}
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
                        >
                          Retry Screen Camera
                        </button>
                      </div>
                    </div>
                  ) : selectedImage ? (
                    /* 2. STATIC IMAGE VIEWPORT */
                    <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] flex items-center justify-center bg-slate-950">
                      <img
                        src={selectedImage}
                        alt="Crop preview"
                        className="w-full h-full max-h-[380px] object-cover"
                      />

                      {/* Scanning HUD Overlay when analyzing */}
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center">
                          <div className="w-full h-2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_25px_#10b981] animate-pulse absolute top-1/2 -translate-y-1/2" />
                          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-emerald-200 text-center space-y-2.5 max-w-xs mx-4 z-10">
                            <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mx-auto flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="font-bold text-slate-900 text-sm">
                              Analyzing Agricultural Features...
                            </div>
                            <div className="text-xs text-slate-500">
                              Verifying crop foliage & detecting phytopathology
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Lens Corner Markers */}
                      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

                      {/* Source badge */}
                      <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full border border-slate-700">
                        {isNonCropTest
                          ? '⚠️ Non-Crop Test Image'
                          : currentFile
                          ? currentFile.name
                          : selectedSample?.crop || 'Leaf Specimen'}
                      </div>
                    </div>
                  ) : (
                    /* 3. EMPTY PROMPT */
                    <div className="p-8 text-center space-y-3 bg-slate-50 text-slate-900 w-full h-full flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <div className="space-y-1 max-w-xs">
                        <p className="text-sm font-bold text-slate-800">
                          Drag & Drop crop leaf image here
                        </p>
                        <p className="text-xs text-slate-500">
                          Or click "Direct Screen Camera" above to scan live
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hidden File Inputs & Hidden Canvas for Frame Grab */}
                <canvas ref={canvasRef} className="hidden" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="browse-image-input"
                />
                <input
                  ref={fallbackCameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="camera-capture-input"
                />

                {/* Action Buttons: Live Direct Screen Scan vs Browse */}
                {isLiveCameraActive ? (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      type="button"
                      onClick={handleDirectScreenScan}
                      id="scanner-live-capture-btn"
                      className="col-span-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition active:scale-98"
                    >
                      <Camera className="w-5 h-5" />
                      <span>📸 Capture & Direct Scan Leaf (तुरंत लाइव स्कैन करें)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const nextMode = facingMode === 'environment' ? 'user' : 'environment';
                        setFacingMode(nextMode);
                        startLiveCamera(nextMode);
                      }}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
                    >
                      Flip Camera
                    </button>
                    <button
                      type="button"
                      onClick={stopLiveCamera}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition flex items-center justify-center gap-1.5"
                    >
                      <VideoOff className="w-4 h-4" />
                      <span>Close Camera</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => startLiveCamera('environment')}
                      id="scanner-direct-camera-btn"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition active:scale-95"
                    >
                      <Video className="w-4 h-4 text-emerald-600" />
                      <span>Direct Screen Camera</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      id="scanner-browse-btn"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition active:scale-95"
                    >
                      <ImageIcon className="w-4 h-4 text-slate-600" />
                      <span>Browse Image</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Run Detection CTA Button */}
              {!isLiveCameraActive && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleDetect}
                    disabled={isAnalyzing || !selectedImage}
                    id="scanner-detect-btn"
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-white text-sm shadow-lg flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] ${
                      isAnalyzing
                        ? 'bg-emerald-400 cursor-wait'
                        : !selectedImage
                        ? 'bg-slate-300 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-600 hover:from-emerald-700 hover:to-lime-700 shadow-emerald-600/25'
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Diagnosing Crop Health...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Run AI Disease Diagnosis</span>
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Protected by Agricultural Vision Guard (Crop-Only Validation)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Prediction Results & Treatment Plan or Rejection Banner */}
            <div className="lg:col-span-6 p-6 sm:p-8 bg-white flex flex-col justify-between">
              {isAnalyzing ? (
                /* Skeleton Loading State */
                <div className="space-y-6 animate-pulse py-4">
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-slate-200 rounded-md w-32" />
                    <div className="h-6 bg-emerald-100 rounded-full w-24" />
                  </div>
                  <div className="h-8 bg-slate-200 rounded-lg w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="h-20 bg-slate-100 rounded-2xl" />
                    <div className="h-20 bg-slate-100 rounded-2xl" />
                    <div className="h-20 bg-slate-100 rounded-2xl" />
                  </div>
                  <div className="h-28 bg-slate-100 rounded-2xl" />
                  <div className="h-24 bg-slate-100 rounded-2xl" />
                </div>
              ) : prediction ? (
                /* 1. NON-CROP REJECTION CARD */
                prediction.isCropImage === false ? (
                  <div className="space-y-5">
                    {/* Alert Banner */}
                    <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/20">
                          <Ban className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                              Agricultural Guard Triggered
                            </span>
                            <span className="text-xs text-rose-500 font-semibold">• Rejection</span>
                          </div>
                          <h4 className="text-xl font-black text-rose-950 mt-1">
                            Non-Crop Image Detected (फसल नहीं है)
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-rose-800 leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-rose-200/80">
                        {prediction.rejectionReason}
                      </p>
                    </div>

                    {/* Why this happened explanation */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        AI Crop Validation Rule:
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>FarmerDetect AI is trained strictly on crop leaves, stems, and farm plants.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>Human faces, selfies, animals, cars, or non-plant objects are deliberately rejected to prevent inaccurate agricultural diagnoses.</span>
                        </li>
                      </ul>
                    </div>

                    {/* How to fix */}
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                      <div className="text-xs font-bold text-emerald-950 mb-1">
                        👉 What to do next:
                      </div>
                      <p className="text-xs text-emerald-800">
                        Please upload or scan a clear photo of an agricultural crop leaf (such as Tomato, Potato, Corn, Apple, Chilli, or Wheat) under good natural lighting.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setPrediction(null);
                          setSelectedImage(SAMPLE_LEAVES[0].imageUrl);
                          setSelectedSample(SAMPLE_LEAVES[0]);
                          setIsNonCropTest(false);
                        }}
                        className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center gap-1.5"
                      >
                        <Leaf className="w-3.5 h-3.5" />
                        <span>Load Verified Tomato Leaf Specimen</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 2. VALID CROP PATHOLOGY RESULT VIEW */
                  <div className="space-y-5">
                    {/* Top Result Banner */}
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {prediction.cropName}
                          </span>
                          <span className="text-[11px] text-slate-400">• {prediction.detectedAt}</span>
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 mt-0.5 tracking-tight">
                          {prediction.diseaseName}
                        </h4>
                        <p className="text-xs text-slate-500 italic mt-0.5">
                          Scientific Taxonomy: {prediction.scientificName}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            prediction.isHealthy
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : prediction.severity === 'Severe'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {prediction.isHealthy ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          )}
                          {prediction.isHealthy ? 'Healthy Leaf' : `${prediction.severity} Severity`}
                        </span>
                      </div>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Confidence */}
                      <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                        <div className="text-[11px] font-semibold text-emerald-800">Model Confidence</div>
                        <div className="text-xl sm:text-2xl font-extrabold text-emerald-900 mt-0.5">
                          {prediction.confidence}%
                        </div>
                        <div className="w-full bg-emerald-200/70 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${prediction.confidence}%` }}
                          />
                        </div>
                      </div>

                      {/* Health Index */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="text-[11px] font-semibold text-slate-600">Health Index</div>
                        <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                          {prediction.cropHealthScore}
                          <span className="text-xs font-medium text-slate-400">/100</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              prediction.cropHealthScore > 75
                                ? 'bg-emerald-500'
                                : prediction.cropHealthScore > 50
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${prediction.cropHealthScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Spread Risk */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="text-[11px] font-semibold text-slate-600">Spread Risk</div>
                        <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                          {prediction.spreadRisk}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Prompt action advised</span>
                        </div>
                      </div>
                    </div>

                    {/* Identified Symptoms List */}
                    <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200">
                      <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <ShieldAlert className="w-4 h-4 text-emerald-600" />
                        Key Pathological Symptoms Identified:
                      </h5>
                      <ul className="space-y-1">
                        {prediction.symptoms.map((symptom, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Treatment Plan Selector Tabs */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Actionable Treatment Protocol:
                        </h5>
                        <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          ICAR & TNAU Standards
                        </span>
                      </div>

                      {/* Tab Buttons */}
                      <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                        <button
                          type="button"
                          onClick={() => setActiveTreatmentTab('organic')}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                            activeTreatmentTab === 'organic'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span>🌿 Organic (Primary)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTreatmentTab('chemical')}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                            activeTreatmentTab === 'chemical'
                              ? prediction.severity === 'Severe'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'bg-slate-700 text-white shadow-sm'
                              : prediction.severity === 'Severe'
                              ? 'text-rose-700 font-extrabold hover:text-rose-900'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span>🧪 Chemical</span>
                          {prediction.severity === 'Severe' ? (
                            <span className="px-1 py-0.2 rounded text-[9px] bg-rose-200 text-rose-900 font-extrabold">Emergency</span>
                          ) : (
                            <span className="px-1 py-0.2 rounded text-[9px] bg-slate-200 text-slate-700">If Severe</span>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTreatmentTab('prevention')}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                            activeTreatmentTab === 'prevention'
                              ? 'bg-emerald-700 text-white shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          🛡️ Prevention
                        </button>
                      </div>

                      {/* Active Tab Content */}
                      <div className={`p-3.5 rounded-2xl border min-h-[90px] ${
                        activeTreatmentTab === 'chemical' && prediction.severity !== 'Severe'
                          ? 'bg-slate-50 border-slate-200'
                          : activeTreatmentTab === 'chemical' && prediction.severity === 'Severe'
                          ? 'bg-rose-50/70 border-rose-200'
                          : 'bg-emerald-50/40 border-emerald-200/80'
                      }`}>
                        {activeTreatmentTab === 'chemical' && prediction.severity !== 'Severe' && (
                          <div className="mb-2 p-2 rounded-xl bg-teal-50 border border-teal-200 text-[11px] text-teal-900 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                            <span>
                              <strong>Chemical Not Recommended:</strong> Disease is at {prediction.severity} stage. Organic remedies are 100% sufficient and cost-effective.
                            </span>
                          </div>
                        )}

                        {activeTreatmentTab === 'chemical' && prediction.severity === 'Severe' && (
                          <div className="mb-2 p-2 rounded-xl bg-rose-100 border border-rose-300 text-[11px] text-rose-950 flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>
                              <strong>🚨 Severe Alert:</strong> Immediate chemical rescue spray recommended alongside organic measures.
                            </span>
                          </div>
                        )}

                        <ul className="space-y-1.5">
                          {prediction.treatment[activeTreatmentTab].map((step, idx) => (
                            <li key={idx} className="text-xs text-slate-800 flex items-start gap-2">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0 ${
                                activeTreatmentTab === 'chemical' && prediction.severity === 'Severe'
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-emerald-600 text-white'
                              }`}>
                                {idx + 1}
                              </div>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Quick Jump to Complete Farmer Advisory Guide */}
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                          <a
                            href="#farmer-advisory-guide"
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                          >
                            <span>🌾 Open Farmer Action Guide & Tank Calculator ↓</span>
                          </a>
                          <span className="text-[10px] text-slate-400">Hindi + English</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePrintReport}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Print Diagnostic Report</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleShare}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                        >
                          {copiedLink ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPrediction(null);
                          setSelectedImage(null);
                          setSelectedSample(null);
                          setCurrentFile(null);
                          setIsNonCropTest(false);
                        }}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        <span>Analyze Another Leaf</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )
              ) : (
                /* Empty Prompt View */
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 min-h-[380px]">
                  <div className="w-18 h-18 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm p-4">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <h4 className="text-lg font-bold text-slate-900">
                      Ready for Crop AI Diagnosis
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Capture a leaf directly with <strong>Direct Screen Camera</strong> or pick a specimen from the top ribbon. FarmerDetect verifies plant foliage and delivers instant pathology remedies.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDetect}
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition active:scale-95"
                  >
                    <span>Test Current Leaf Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comprehensive Farmer Disease Solution Guide */}
        {prediction && prediction.isCropImage !== false && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <FarmerDiseaseSolutionGuide
              prediction={prediction}
              onShowToast={onShowToast}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};
