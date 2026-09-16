import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ShieldCheck, Thermometer, Droplets, AlertCircle, X, ChevronRight, Check } from 'lucide-react';
import { CROP_KNOWLEDGE } from '../data/mockData';
import { CropKnowledge } from '../types';

export const CropCard = ({
  crop,
  onSelect,
}: {
  key?: string;
  crop: CropKnowledge;
  onSelect: (crop: CropKnowledge) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 overflow-hidden transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Card Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={crop.imageUrl}
            alt={crop.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-xl font-bold leading-tight">{crop.name}</h3>
            <p className="text-xs text-emerald-300 italic">{crop.scientificName}</p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            {crop.tagline}
          </p>

          {/* Common Diseases Pills */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Common Pathologies:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {crop.commonDiseases.slice(0, 3).map((dis, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/60"
                >
                  {dis}
                </span>
              ))}
              {crop.commonDiseases.length > 3 && (
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  +{crop.commonDiseases.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Key Symptoms preview */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wide">
              Key Symptoms:
            </span>
            <p className="text-slate-600 line-clamp-2">
              {crop.symptoms[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onSelect(crop)}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors flex items-center justify-center gap-1.5 group/btn"
        >
          <span>View Pathology & Prevention</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export const CropKnowledgeBase = () => {
  const [activeCropModal, setActiveCropModal] = useState<CropKnowledge | null>(null);

  return (
    <section id="knowledge-base" className="py-24 bg-slate-50 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            Comprehensive Plant Pathology Directory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Crop Pathology Knowledge Base
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore pathology signatures, early visual symptoms, and scientifically validated 
            prevention guidelines across India’s core horticultural and cereal staples.
          </p>
        </div>

        {/* 6 Crop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CROP_KNOWLEDGE.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
              onSelect={(selected) => setActiveCropModal(selected)}
            />
          ))}
        </div>
      </div>

      {/* Deep Crop Knowledge Modal */}
      <AnimatePresence>
        {activeCropModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCropModal(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden z-10 my-8"
            >
              {/* Header Image banner */}
              <div className="relative h-48 sm:h-56 bg-slate-900">
                <img
                  src={activeCropModal.imageUrl}
                  alt={activeCropModal.name}
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                <button
                  onClick={() => setActiveCropModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950 transition"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-semibold tracking-wider text-emerald-400">
                    Agronomy Profile
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black">{activeCropModal.name}</h3>
                  <p className="text-sm text-emerald-200 italic">{activeCropModal.scientificName}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeCropModal.tagline}
                </p>

                {/* Optimal Environmental Baseline */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Thermometer className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Opt. Temp</span>
                      <span className="text-xs font-bold text-slate-800">{activeCropModal.optimalConditions.temp}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-lime-100 text-lime-700 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Soil & pH</span>
                      <span className="text-xs font-bold text-slate-800">{activeCropModal.optimalConditions.soil}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Irrigation</span>
                      <span className="text-xs font-bold text-slate-800">{activeCropModal.optimalConditions.water}</span>
                    </div>
                  </div>
                </div>

                {/* Primary Pathologies */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-emerald-600" />
                    Common Plant Pathologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeCropModal.commonDiseases.map((dis, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold"
                      >
                        {dis}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Symptoms & Visual Markers */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Visual Diagnostic Symptoms:
                  </h4>
                  <ul className="space-y-1.5">
                    {activeCropModal.symptoms.map((sym, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prevention Protocols */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Proactive Agronomic Prevention:
                  </h4>
                  <ul className="space-y-1.5">
                    {activeCropModal.preventionTips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Smart India Hackathon 2026 Reference Dataset
                </span>
                <button
                  onClick={() => setActiveCropModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition"
                >
                  Close Guide
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
