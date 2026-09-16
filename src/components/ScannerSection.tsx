import React, { useState, useRef } from 'react';
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
  Info
} from 'lucide-react';
import { PredictionResult, SampleLeaf } from '../types';
import { SAMPLE_LEAVES } from '../data/mockData';
import { detectCropDisease } from '../services/aiDetection';

interface ScannerSectionProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export const ScannerSection = ({ onShowToast }: ScannerSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_LEAVES[0].imageUrl);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [selectedSample, setSelectedSample] = useState<SampleLeaf | null>(SAMPLE_LEAVES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [activeTreatmentTab, setActiveTreatmentTab] = useState<'organic' | 'chemical' | 'prevention'>('organic');
  const [isDragOver, setIsDragOver] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Initial auto-detection simulation for the default sample so users see result immediately or can re-trigger
  const handleDetect = async () => {
    if (!selectedImage && !currentFile) {
      onShowToast('info', 'Select an Image', 'Please upload a leaf image or pick a sample leaf below.');
      return;
    }

    setIsAnalyzing(true);
    setPrediction(null);

    try {
      const source = currentFile || selectedImage || '';
      const result = await detectCropDisease(source, selectedSample);
      setPrediction(result);
      onShowToast(
        'success',
        result.isHealthy ? 'Healthy Leaf Confirmed!' : `Diagnosis: ${result.diseaseName}`,
        `Analysis completed with ${result.confidence}% model confidence.`
      );
    } catch (err) {
      console.error(err);
      onShowToast('error', 'Detection Error', 'Failed to process the leaf image. Please try again.');
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
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setCurrentFile(file);
      setSelectedSample(null);
      setPrediction(null);
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
    setSelectedImage(sample.imageUrl);
    setSelectedSample(sample);
    setCurrentFile(null);
    setPrediction(null);
    onShowToast('info', 'Sample Selected', `Loaded ${sample.crop} - ${sample.condition}`);
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Interactive Crop AI Diagnosis
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Analyze Plant Pathology in Real-Time
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Upload a clear photo of an infected or suspect crop leaf. Our MobileNetV2 neural vision 
            classifies the disease, estimates severity, and yields immediate agronomic solutions.
          </p>
        </div>

        {/* Interactive Workspace Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Top Quick-Preset Selector Ribbon */}
          <div className="bg-slate-100/70 p-4 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                Quick Test Samples (Instant Click to Test):
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Click any specimen to load verified pathology
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {SAMPLE_LEAVES.map((sample) => {
                const isSelected = selectedSample?.id === sample.id;
                return (
                  <button
                    key={sample.id}
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
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {sample.crop}
                      </div>
                      <div className={`text-[10px] truncate ${sample.type === 'Healthy' ? 'text-emerald-600 font-semibold' : 'text-slate-500'}`}>
                        {sample.condition.split('(')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Grid: Upload Area on Left, Diagnosis Output on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left Column: Image Upload & Viewfinder */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-emerald-600" />
                    Leaf Photo Input
                  </h3>
                  {selectedImage && (
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setSelectedSample(null);
                        setCurrentFile(null);
                        setPrediction(null);
                      }}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition"
                    >
                      Clear Image
                    </button>
                  )}
                </div>

                {/* Drop Zone / Image Viewport */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden flex flex-col items-center justify-center min-h-[300px] sm:min-h-[360px] ${
                    isDragOver
                      ? 'border-emerald-500 bg-emerald-50/60 scale-[0.99]'
                      : selectedImage
                      ? 'border-emerald-300 bg-slate-900'
                      : 'border-slate-300 bg-slate-50/70 hover:border-emerald-400'
                  }`}
                >
                  {selectedImage ? (
                    <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] flex items-center justify-center">
                      <img
                        src={selectedImage}
                        alt="Crop leaf preview"
                        className="w-full h-full max-h-[380px] object-cover"
                      />

                      {/* Scanning HUD Overlay when analyzing */}
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center">
                          {/* Animated Scan Bar */}
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="w-full h-2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981] animate-pulse" />
                          </div>

                          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-emerald-200 text-center space-y-3 max-w-xs mx-4">
                            <div className="relative w-12 h-12 mx-auto">
                              <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping opacity-75" />
                              <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-emerald-600" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm">
                                MobileNetV2 Processing...
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                Extracting 224x224 tensor features & comparing 38+ classes
                              </div>
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
                      <div className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {currentFile ? currentFile.name : selectedSample?.crop || 'Leaf Specimen'}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <div className="space-y-1 max-w-xs">
                        <p className="text-sm font-bold text-slate-800">
                          Drag & Drop your crop leaf image here
                        </p>
                        <p className="text-xs text-slate-500">
                          Supports PNG, JPG, or WEBP up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hidden File Inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="browse-image-input"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="camera-capture-input"
                />

                {/* Action Buttons: Browse & Camera */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    id="scanner-browse-btn"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition active:scale-95"
                  >
                    <ImageIcon className="w-4 h-4 text-slate-600" />
                    <span>Browse Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    id="scanner-camera-btn"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition active:scale-95"
                  >
                    <Camera className="w-4 h-4 text-slate-600" />
                    <span>Open Camera</span>
                  </button>
                </div>
              </div>

              {/* Detect Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDetect}
                  disabled={isAnalyzing || !selectedImage}
                  id="scanner-detect-btn"
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-white text-base shadow-xl flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98] ${
                    isAnalyzing
                      ? 'bg-emerald-400 cursor-wait'
                      : !selectedImage
                      ? 'bg-slate-300 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-600 hover:from-emerald-700 hover:to-lime-700 shadow-emerald-600/30'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Classifying Phytopathology...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Run AI Disease Diagnosis</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Edge AI • Instant Results • Zero Data Retention
                </p>
              </div>
            </div>

            {/* Right Column: Prediction Results & Treatment Plan */}
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
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="h-20 bg-slate-100 rounded-2xl p-4" />
                    <div className="h-20 bg-slate-100 rounded-2xl p-4" />
                  </div>

                  <div className="h-32 bg-slate-100 rounded-2xl p-4" />
                  <div className="h-24 bg-slate-100 rounded-2xl p-4" />
                </div>
              ) : prediction ? (
                /* Live Result View */
                <div className="space-y-6">
                  {/* Top Result Banner */}
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
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
                    <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                      <div className="text-[11px] font-semibold text-emerald-800">Confidence</div>
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
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
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
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="text-[11px] font-semibold text-slate-600">Spread Risk</div>
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                        {prediction.spreadRisk}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Prompt action advised
                      </div>
                    </div>
                  </div>

                  {/* Identified Symptoms List */}
                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                      <ShieldAlert className="w-4 h-4 text-emerald-600" />
                      Key Pathological Symptoms Identified:
                    </h5>
                    <ul className="space-y-1.5">
                      {prediction.symptoms.map((symptom, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatment Plan Selector Tabs */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Actionable Treatment Protocol:
                      </h5>
                      <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        ICAR & TNAU Formulations
                      </span>
                    </div>

                    {/* Tab Buttons */}
                    <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setActiveTreatmentTab('organic')}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          activeTreatmentTab === 'organic'
                            ? 'bg-white text-emerald-700 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        🌿 Organic Controls
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTreatmentTab('chemical')}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          activeTreatmentTab === 'chemical'
                            ? 'bg-white text-emerald-700 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        🧪 Chemical / Fungicide
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTreatmentTab('prevention')}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          activeTreatmentTab === 'prevention'
                            ? 'bg-white text-emerald-700 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        🛡️ Agronomic Prevention
                      </button>
                    </div>

                    {/* Active Tab Content */}
                    <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 min-h-[110px]">
                      <ul className="space-y-2">
                        {prediction.treatment[activeTreatmentTab].map((step, idx) => (
                          <li key={idx} className="text-xs text-slate-800 flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">
                              {idx + 1}
                            </div>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrintReport}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Print Diagnostic Report</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleShare}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
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
                      }}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>Analyze Another Leaf</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty Prompt View */
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 min-h-[380px]">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <h4 className="text-lg font-bold text-slate-800">
                      Ready for AI Disease Diagnosis
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Click the green <strong>Run AI Disease Diagnosis</strong> button or pick any sample 
                      from the top ribbon to see instant pathology detection, confidence metrics, 
                      and scientific agronomic remedies.
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
      </div>
    </section>
  );
};
