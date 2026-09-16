import type { ElementType } from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Sparkles, Activity, Smartphone, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { FEATURES } from '../data/mockData';
import { FeatureItem } from '../types';

const iconMap: Record<string, ElementType> = {
  Cpu,
  Zap,
  Sparkles,
  Activity,
  Smartphone,
  ShieldCheck,
};

export const FeatureCard = ({ feature, index }: { key?: string; feature: FeatureItem; index: number }) => {
  const IconComponent = iconMap[feature.iconName] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Background soft glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-200/50 transition-colors pointer-events-none" />

      <div>
        {/* Icon & Metric Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <IconComponent className="w-6 h-6" />
          </div>

          {feature.metric && (
            <div className="text-right">
              <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/70">
                {feature.metric}
              </span>
              {feature.metricLabel && (
                <span className="block text-[10px] text-slate-400 font-medium mt-1">
                  {feature.metricLabel}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Bottom Subtle Indicator */}
      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Precision Agronomy</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </motion.div>
  );
};

export const WhyFarmerDetect = () => {
  return (
    <section id="why-farmerdetect" className="py-24 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-100 text-lime-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-lime-700" />
            Built for Smart India Hackathon 2026
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose FarmerDetect?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Engineered to overcome crop loss across millions of Indian smallholder farms 
            with state-of-the-art vision models, instant diagnosis, and localized treatment remedies.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <FeatureCard key={feature.id} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
