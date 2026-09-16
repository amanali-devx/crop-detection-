import { motion } from 'motion/react';
import { ArrowRight, Scan, ShieldCheck, Zap, Activity, CheckCircle, Sparkles } from 'lucide-react';

interface HeroProps {
  onScanClick: () => void;
}

export const Hero = ({ onScanClick }: HeroProps) => {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50">
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-300/25 via-lime-200/20 to-teal-200/20 blur-3xl rounded-full" />
        <div className="absolute -top-10 -left-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-lime-400/15 rounded-full blur-3xl" />
        
        {/* Subtle agricultural grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#16a34a 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* SIH Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/70 text-emerald-800 text-xs font-semibold shadow-sm backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Smart India Hackathon 2026 Initiative</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 font-medium">Precision Agronomy</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
            >
              Protect Your Crops <br className="hidden sm:inline" />
              with <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-600 bg-clip-text text-transparent">AI Vision</span>.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Diagnose crop diseases instantly with our deep learning MobileNetV2 neural vision. 
              Upload or snap any leaf photo to receive real-time pathology classification, symptom 
              breakdowns, and verified organic and chemical treatment plans.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={onScanClick}
                id="hero-try-scanner-cta"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all duration-200 active:scale-95 group text-base"
              >
                <Scan className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Try AI Scanner</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#how-it-works"
                id="hero-learn-more-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all duration-200 active:scale-95 text-base"
              >
                <span>Learn More</span>
              </a>
            </motion.div>

            {/* Key Micro-Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/70 max-w-lg mx-auto lg:mx-0 text-left"
            >
              <div>
                <div className="text-2xl font-bold text-slate-900 flex items-center gap-1">
                  98.4%
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Top-1</span>
                </div>
                <div className="text-xs text-slate-500 font-medium">Model Accuracy</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-slate-900">38+</div>
                <div className="text-xs text-slate-500 font-medium">Plant Pathologies</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-slate-900">&lt; 1.2s</div>
                <div className="text-xs text-slate-500 font-medium">Edge Inference</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual AI Scanning HUD & Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-md w-full"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500 to-lime-400 rounded-3xl blur-xl opacity-30 animate-pulse" />

              {/* Main Card */}
              <div className="relative rounded-2xl bg-white border border-slate-200/80 shadow-2xl p-4 overflow-hidden">
                {/* Header bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      MobileNetV2 Neural Scanner
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    224x224 RGB
                  </span>
                </div>

                {/* Leaf Image with Scanning Radar Viewfinder */}
                <div className="relative mt-3 rounded-xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-inner group">
                  <img
                    src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80"
                    alt="Tomato leaf analysis"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Visual Scanning Line Animation */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div 
                      className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-scan"
                      style={{
                        animation: 'scanLine 3s ease-in-out infinite alternate',
                      }}
                    />
                  </div>

                  {/* Bounding Box HUD Overlays */}
                  <div className="absolute top-1/4 left-1/4 w-28 h-24 border-2 border-dashed border-emerald-400/80 rounded-lg pointer-events-none flex items-start justify-end p-1">
                    <span className="bg-emerald-600/90 text-white text-[9px] font-mono font-bold px-1 rounded">
                      Lesion 01 (97.4%)
                    </span>
                  </div>

                  {/* Live Status Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md rounded-lg p-2.5 text-white flex items-center justify-between text-xs border border-white/10">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span className="font-medium">Early Blight detected</span>
                    </div>
                    <span className="font-bold text-emerald-400">97.4% Match</span>
                  </div>
                </div>

                {/* Bottom Diagnosis Highlights */}
                <div className="mt-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Class: Solanum lycopersicum</span>
                    <span className="text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Moderate Severity
                    </span>
                  </div>
                  
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Biological control protocol: <strong>Neem oil spray (2%)</strong> generated</span>
                  </div>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg border border-slate-200 p-3 flex items-center gap-2.5 hidden sm:flex">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">ICAR Standard Aligned</div>
                  <div className="text-[10px] text-slate-500">Agronomic Guidelines 2026</div>
                </div>
              </div>

              {/* Floating Speed Badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-slate-200 p-2.5 flex items-center gap-2 hidden sm:flex">
                <div className="w-7 h-7 rounded-lg bg-lime-500 flex items-center justify-center text-white">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-800">1.1s Diagnosis</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanLine {
          0% { transform: translateY(0%); }
          100% { transform: translateY(280px); }
        }
      `}</style>
    </section>
  );
};
