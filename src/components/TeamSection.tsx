import { motion } from 'motion/react';
import { Users, Award, Github, Linkedin, ExternalLink } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/mockData';
import { TeamMember } from '../types';

export const TeamCard = ({ member, index }: { key?: string; member: TeamMember; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top Avatar & Initials Badge */}
        <div className="flex items-start justify-between mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-lime-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              {member.initials}
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-[10px] text-emerald-600 font-bold shadow-sm">
              ✓
            </div>
          </div>

          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200/80">
            SIH 2026 Core
          </span>
        </div>

        {/* Name & Role */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
          {member.name}
        </h3>
        <p className="text-xs font-semibold text-emerald-600 mt-0.5">
          {member.role}
        </p>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
          {member.sihRole}
        </p>

        {/* Bio */}
        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
          {member.bio}
        </p>

        {/* Skills tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {member.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/60"
            >
              {skill}
            </span>
          ))}
          {member.skills.length > 3 && (
            <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md">
              +{member.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Social and Contact Links */}
      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {member.githubUrl && (
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label={`${member.name}'s GitHub`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>

        <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
          <span>Finalist Team</span>
          <Award className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
};

export const TeamSection = () => {
  return (
    <section id="team" className="py-24 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            Smart India Hackathon 2026 Finalists
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet the Engineering Team
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            The multi-disciplinary student engineers and designers building next-generation 
            agricultural AI solutions to empower Indian kisans.
          </p>
        </div>

        {/* Team Cards Grid (5 members) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <TeamCard key={member.name} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
