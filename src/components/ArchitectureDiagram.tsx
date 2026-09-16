import type { ElementType } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Layout, Server, BrainCircuit, FileCheck, ArrowRight, ArrowDown } from 'lucide-react';
import { ARCHITECTURE_NODES } from '../data/mockData';

const iconMap: Record<string, ElementType> = {
  Smartphone,
  Layout,
  Server,
  BrainCircuit,
  FileCheck,
};

export const ArchitectureDiagram = () => {
  return (
    <section id="architecture" className="py-24 bg-slate-900 text-white relative scroll-mt-20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-500/10 blur-3xl rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            System Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            End-to-End Technology Pipeline
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Scalable, low-latency microservice architecture designed for seamless field performance, 
            high-throughput inference, and agricultural precision.
          </p>
        </div>

        {/* Visual Pipeline Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative">
          {ARCHITECTURE_NODES.map((node, idx) => {
            const IconComp = iconMap[node.iconName] || Server;
            const isLast = idx === ARCHITECTURE_NODES.length - 1;

            return (
              <div key={node.id} className="relative flex flex-col justify-between">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-slate-800/80 hover:bg-slate-800 backdrop-blur-md rounded-3xl p-6 border border-slate-700/80 hover:border-emerald-500/60 shadow-xl transition-all duration-300 h-full flex flex-col justify-between group"
                >
                  <div>
                    {/* Node Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-emerald-400">
                        {node.latency}
                      </span>
                    </div>

                    {/* Step & Role */}
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      Node 0{idx + 1} • {node.role}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                      {node.title}
                    </h3>

                    <div className="text-xs font-mono text-slate-400 mb-3 line-clamp-1">
                      {node.technology}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {node.description}
                    </p>
                  </div>

                  {/* Flow status */}
                  <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Active Route
                    </span>
                    <span className="font-mono text-emerald-400">JSON/Protobuf</span>
                  </div>
                </motion.div>

                {/* Arrow Connector on desktop */}
                {!isLast && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 items-center justify-center shadow-lg pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Arrow Connector on mobile */}
                {!isLast && (
                  <div className="flex lg:hidden justify-center my-2 text-emerald-400">
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Specs Ticker */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-emerald-400">14.2 MB</div>
            <div className="text-xs text-slate-400">Quantized TFLite Weight</div>
          </div>
          <div>
            <div className="text-xl font-bold text-emerald-400">224 × 224</div>
            <div className="text-xs text-slate-400">Input Tensor Dimensions</div>
          </div>
          <div>
            <div className="text-xl font-bold text-emerald-400">Depthwise</div>
            <div className="text-xs text-slate-400">Separable Convolutions</div>
          </div>
          <div>
            <div className="text-xl font-bold text-emerald-400">REST / TLS 1.3</div>
            <div className="text-xs text-slate-400">Secure Ingress Protocol</div>
          </div>
        </div>
      </div>
    </section>
  );
};
