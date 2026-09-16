import type { ElementType } from 'react';
import { motion } from 'motion/react';
import { UploadCloud, Cpu, CheckCircle2, ShieldPlus, ArrowRight } from 'lucide-react';
import { TIMELINE_STEPS } from '../data/mockData';

const iconMap: Record<string, ElementType> = {
  UploadCloud,
  Cpu,
  CheckCircle2,
  ShieldPlus,
};

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white relative scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How FarmerDetect Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From field leaf snapshot to actionable cure protocols in four seamless, automated steps.
          </p>
        </div>

        {/* Timeline Steps Grid */}
        <div className="relative">
          {/* Desktop connecting horizontal line */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-lime-300 -translate-y-8 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {TIMELINE_STEPS.map((step, idx) => {
              const IconComp = iconMap[step.iconName] || UploadCloud;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="group bg-slate-50 hover:bg-white rounded-3xl p-7 border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Step Tag & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm text-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-emerald-600 group-hover:to-lime-500 group-hover:text-white transition-all duration-300">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
                        {step.tag}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {step.title}
                    </h3>
                    <div className="text-xs font-semibold text-emerald-600 mb-3">
                      {step.subtitle}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Footnote */}
                  <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-emerald-700 transition-colors">
                    <span>Phase 0{step.step} Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
