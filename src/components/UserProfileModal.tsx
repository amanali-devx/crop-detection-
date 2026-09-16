import { motion } from 'motion/react';
import { X, User, Sprout, MapPin, Calendar, LogOut, CheckCircle2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  user: UserProfile | null;
  onClose: () => void;
  onLogout: () => void;
  onScanClick: () => void;
}

export const UserProfileModal = ({
  isOpen,
  user,
  onClose,
  onLogout,
  onScanClick,
}: UserProfileModalProps) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/90 max-w-lg w-full overflow-hidden z-10 my-6"
      >
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-600 relative p-4 flex justify-end">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-950/40 text-white hover:bg-slate-950/70 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          {/* Avatar */}
          <div className="-mt-14 mb-4 flex items-end justify-between">
            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-xl">
              <div className="w-full h-full rounded-xl bg-gradient-to-tr from-emerald-700 to-lime-500 text-white font-black text-2xl flex items-center justify-center shadow-inner">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase()}
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified SIH Account
            </span>
          </div>

          {/* User Details */}
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
            <p className="text-xs font-semibold text-emerald-600">{user.role}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>

          {/* Key Meta Stats */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Region / Cluster
              </span>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {user.farmLocation || 'India'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Member Since
              </span>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {user.memberSince}
              </span>
            </div>
          </div>

          {/* Primary Crops Tagged */}
          <div className="mt-4">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Primary Cultivated Crops:
            </span>
            <div className="flex flex-wrap gap-2">
              {(user.primaryCrops || ['Tomato', 'Potato']).map((crop, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80 flex items-center gap-1"
                >
                  <Sprout className="w-3 h-3 text-emerald-600" />
                  {crop}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                onClose();
                onScanClick();
              }}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Launch AI Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onLogout}
              className="py-2.5 px-4 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
