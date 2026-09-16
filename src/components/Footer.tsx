import { Sprout, ShieldCheck, Heart, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-lime-500 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-white tracking-tight">
                    Farmer<span className="text-emerald-400">Detect</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    SIH 2026
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-400 tracking-wider">
                  PRECISION CROP AI
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering Indian agriculture with edge-accessible computer vision. 
              Detect crop pathologies within seconds and access verified treatment 
              protocols directly from your field smartphone.
            </p>

            {/* SIH 2026 Badge Box */}
            <div className="inline-flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block text-xs">Smart India Hackathon 2026</span>
                <span className="text-[10px] text-slate-400">Agriculture, Foodtech & Rural Development</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#scanner" className="hover:text-emerald-400 transition">
                  AI Crop Scanner
                </a>
              </li>
              <li>
                <a href="#why-farmerdetect" className="hover:text-emerald-400 transition">
                  Why FarmerDetect
                </a>
              </li>
              <li>
                <a href="#knowledge-base" className="hover:text-emerald-400 transition">
                  Crop Knowledge Base
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-emerald-400 transition">
                  Tech Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Supported Crops */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Key Crops
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#knowledge-base" className="hover:text-emerald-400 transition">
                  Tomato (Early/Late Blight)
                </a>
              </li>
              <li>
                <a href="#knowledge-base" className="hover:text-emerald-400 transition">
                  Potato (Late Blight)
                </a>
              </li>
              <li>
                <a href="#knowledge-base" className="hover:text-emerald-400 transition">
                  Corn (Common Rust)
                </a>
              </li>
              <li>
                <a href="#knowledge-base" className="hover:text-emerald-400 transition">
                  Apple (Apple Scab)
                </a>
              </li>
              <li>
                <a href="#knowledge-base" className="hover:text-emerald-400 transition">
                  Pepper (Bacterial Spot)
                </a>
              </li>
            </ul>
          </div>

          {/* Team & Social */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Connect & Team
            </h4>
            <ul className="space-y-2.5 text-xs mb-4">
              <li>
                <a href="#team" className="hover:text-emerald-400 transition">
                  Team Members
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition">
                  Contact Form
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>© 2026 FarmerDetect. Built with pride for Smart India Hackathon.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400 text-[11px]">
              Advisory tool designed to assist agrarian communities.
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition border border-slate-800 flex items-center gap-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
