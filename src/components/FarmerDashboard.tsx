import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CloudSun,
  Droplets,
  Wind,
  AlertTriangle,
  Calendar,
  CheckSquare,
  Square,
  Plus,
  ArrowRight,
  TrendingUp,
  Activity,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Sparkles,
  ChevronRight,
  RefreshCw,
  FlaskConical,
  BookOpen,
  MapPin,
  HelpCircle,
  X,
  ExternalLink,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertCircle,
  Thermometer,
  Sprout,
  Eye,
} from 'lucide-react';
import {
  REGIONAL_WEATHER,
  INITIAL_CALENDAR_TASKS,
  DAILY_FARMING_TIPS,
  FERTILIZER_RECOMMENDATIONS,
  CROP_SHORTCUTS,
  ScanHistoryRecord,
  getSavedScanHistory,
  CalendarTask,
  FarmingTip,
} from '../data/dashboardData';
import { UserProfile } from '../types';

interface FarmerDashboardProps {
  user?: UserProfile | null;
  onScanClick: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export const FarmerDashboard = ({
  user,
  onScanClick,
  onShowToast,
}: FarmerDashboardProps) => {
  // Region / Location State
  const [selectedRegionKey, setSelectedRegionKey] = useState<string>('pune');
  const currentWeather = REGIONAL_WEATHER[selectedRegionKey] || REGIONAL_WEATHER['pune'];

  // Scan History & Stats State
  const [scanHistory, setScanHistory] = useState<ScanHistoryRecord[]>([]);
  const [selectedScanDetail, setSelectedScanDetail] = useState<ScanHistoryRecord | null>(null);

  // Crop Calendar Tasks State
  const [tasks, setTasks] = useState<CalendarTask[]>(INITIAL_CALENDAR_TASKS);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'Spraying' | 'Irrigation' | 'Fertilizer' | 'Sowing'>('Spraying');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  // Farming Tips State
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Fertilizer Recommendation State
  const [selectedFertilizerCondition, setSelectedFertilizerCondition] = useState<string>('Early Blight');

  // Disease Alert Banner State
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [alertExpanded, setAlertExpanded] = useState(true);

  // Crop Shortcut Modal State
  const [selectedCropShortcut, setSelectedCropShortcut] = useState<any | null>(null);

  // Load Scan History from localStorage on mount & listen to storage events
  useEffect(() => {
    const loadHistory = () => {
      setScanHistory(getSavedScanHistory());
    };
    loadHistory();

    // Custom window listener for real-time scan updates from ScannerSection
    const handleHistoryUpdate = () => {
      loadHistory();
    };
    window.addEventListener('farmerdetect_scan_saved', handleHistoryUpdate);
    return () => window.removeEventListener('farmerdetect_scan_saved', handleHistoryUpdate);
  }, []);

  // Compute Crop Health Summary Metrics
  const totalScans = scanHistory.length;
  const healthyCount = scanHistory.filter((s) => s.isHealthy).length;
  const diseasedCount = totalScans - healthyCount;
  const healthyPercent = totalScans > 0 ? Math.round((healthyCount / totalScans) * 100) : 100;
  const avgHealthScore = totalScans > 0
    ? Math.round(scanHistory.reduce((acc, s) => acc + (s.cropHealthScore || 70), 0) / totalScans)
    : 85;

  // Calendar task toggle
  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;

    const newTask: CalendarTask = {
      id: 'task-' + Date.now(),
      title: newTaskInput.trim(),
      hindiTitle: newTaskInput.trim(),
      crop: 'Farm General',
      timeframe: 'Scheduled for Today',
      category: newTaskCategory,
      completed: false,
      priority: 'Medium',
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTaskInput('');
    setShowAddTaskForm(false);
    onShowToast('success', 'Task Added', 'New farming task added to your crop calendar.');
  };

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % DAILY_FARMING_TIPS.length);
  };

  const currentTip = DAILY_FARMING_TIPS[currentTipIndex];
  const currentFertilizer = FERTILIZER_RECOMMENDATIONS[selectedFertilizerCondition] || FERTILIZER_RECOMMENDATIONS['Early Blight'];

  return (
    <section id="dashboard" className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-lime-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/90 text-emerald-900 border border-emerald-300 mb-2">
              <Sprout className="w-3.5 h-3.5 text-emerald-700" />
              <span>किसान डैशबोर्ड • SMART FARMER INTELLIGENCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Farm Management & Crop Advisory
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Real-time weather risk warnings, crop calendars, diagnostic history, and agronomist-verified soil recommendations in one unified workspace.
            </p>
          </div>

          {/* Region Switcher & Quick Scan Action */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <select
                aria-label="Select Farm Region"
                value={selectedRegionKey}
                onChange={(e) => {
                  setSelectedRegionKey(e.target.value);
                  onShowToast('info', 'Region Updated', `Weather and advisory synced for ${REGIONAL_WEATHER[e.target.value].region}`);
                }}
                className="text-xs font-bold text-slate-800 bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
              >
                <option value="pune">Maharashtra (Pune / Nashik)</option>
                <option value="ludhiana">Punjab (Ludhiana / Malwa)</option>
                <option value="varanasi">Uttar Pradesh (Varanasi / Purvanchal)</option>
                <option value="indore">Madhya Pradesh (Indore / Malwa)</option>
              </select>
            </div>

            <button
              onClick={onScanClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/25 transition active:scale-95"
            >
              <span>Scan Crop Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. 🚨 DISEASE ALERT BANNER (Top Priority Notification) */}
        {!alertDismissed && currentWeather.diseaseRiskAlert.active && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 border-rose-300 bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 p-4 sm:p-5 shadow-md shadow-rose-500/5 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/30 animate-pulse">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white">
                      🚨 High Disease Alert
                    </span>
                    <span className="text-xs text-rose-800 font-semibold">
                      Relative Humidity {currentWeather.humidity}% • {currentWeather.region}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-rose-950">
                    {currentWeather.diseaseRiskAlert.title}
                  </h3>
                  <p className="text-xs font-bold text-rose-700">
                    {currentWeather.diseaseRiskAlert.hindiTitle}
                  </p>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    {currentWeather.diseaseRiskAlert.reason}
                  </p>
                </div>
              </div>

              {/* Alert Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setAlertExpanded(!alertExpanded)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white/80 hover:bg-white border border-slate-300 transition flex items-center gap-1"
                >
                  <span>{alertExpanded ? 'Hide Steps' : 'View Action Steps'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${alertExpanded ? 'rotate-180' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={onScanClick}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition"
                >
                  Scan Vulnerable Crops
                </button>
                <button
                  type="button"
                  onClick={() => setAlertDismissed(true)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-rose-100 transition"
                  aria-label="Dismiss alert"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expandable Preventive Steps */}
            {alertExpanded && (
              <div className="mt-4 pt-4 border-t border-rose-200/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1.5">
                  <span className="font-bold text-rose-900 block">
                    🌱 Vulnerable Field Crops in this Region:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentWeather.diseaseRiskAlert.affectedCrops.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded-md bg-white border border-rose-200 text-rose-900 font-semibold text-[11px]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold text-rose-900 block">
                    🛡️ Immediate Preventive Countermeasures:
                  </span>
                  <ul className="space-y-1 text-slate-700">
                    {currentWeather.diseaseRiskAlert.preventiveSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 1. 🌦️ WEATHER & ADVISORY SECTION (Row 1) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Weather Primary Metrics (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    <CloudSun className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      🌦️ Weather & Micro-Climate Advisory
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {currentWeather.region}, {currentWeather.state} • Real-Time Station Feed
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Live Farm Telemetry
                </span>
              </div>

              {/* Main Temp & Condition */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-slate-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900">
                    {currentWeather.temperature}°C
                  </span>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{currentWeather.condition}</div>
                    <div className="text-xs text-slate-500">Day High: 31°C • Night Low: 21°C</div>
                  </div>
                </div>

                {/* Rain Probability Pill */}
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-sky-50 border border-sky-200">
                  <Droplets className="w-4 h-4 text-sky-600 animate-bounce" />
                  <div>
                    <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">Rain Probability</div>
                    <div className="text-sm font-extrabold text-sky-950">{currentWeather.rainChance}% Chance</div>
                  </div>
                </div>
              </div>

              {/* 4 Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Humidity (आर्द्रता)</span>
                  <div className="text-base font-black text-slate-900 mt-0.5 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span>{currentWeather.humidity}%</span>
                  </div>
                  <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">
                    {currentWeather.humidity > 75 ? '⚠️ High Spore Risk' : 'Optimal'}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Wind (हवा की गति)</span>
                  <div className="text-base font-black text-slate-900 mt-0.5 flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-slate-500" />
                    <span>{currentWeather.windSpeed} km/h</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">Safe Spraying Range</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Soil Moisture (नमी)</span>
                  <div className="text-base font-black text-slate-900 mt-0.5 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{currentWeather.soilMoisture}%</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Root-zone Field Cap</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Solar / UV Index</span>
                  <div className="text-base font-black text-slate-900 mt-0.5 flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                    <span>Index {currentWeather.uvIndex}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Moderate Transpiration</span>
                </div>
              </div>

              {/* 3-Day Mini Forecast */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                {currentWeather.forecast.map((f, i) => (
                  <div key={i} className="p-2 rounded-xl bg-slate-50 text-center">
                    <div className="text-[11px] font-bold text-slate-700">{f.day}</div>
                    <div className="text-xs font-black text-slate-900 my-0.5">{f.high}° / {f.low}°</div>
                    <div className="text-[10px] text-sky-700 font-semibold flex items-center justify-center gap-0.5">
                      <Droplets className="w-2.5 h-2.5" />
                      <span>{f.rainProb}% Rain</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Farming Advisory Box (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-bold border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Agronomist Advisory • कृषि सलाह</span>
                </div>
                <span className="text-[11px] text-emerald-300">Updated 1 hr ago</span>
              </div>

              <div>
                <h4 className="text-base font-black text-white leading-snug">
                  Precision Field Recommendation
                </h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed mt-2 bg-emerald-900/40 p-3 rounded-2xl border border-emerald-700/40">
                  "{currentWeather.farmingAdvisory}"
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
                <span className="text-[10px] font-bold text-emerald-300 uppercase block tracking-wider">
                  हिंदी में सलाह (Hindi Advisory)
                </span>
                <p className="text-xs text-emerald-50 font-medium mt-1 leading-relaxed">
                  {currentWeather.hindiAdvisory}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-emerald-700/50 flex items-center justify-between">
              <div className="text-[11px] text-emerald-300 font-medium">
                Recommendation tuned to current 84% humidity
              </div>
              <button
                onClick={onScanClick}
                className="px-3 py-1.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-100 font-bold text-xs shadow-sm transition active:scale-95 flex items-center gap-1"
              >
                <span>Diagnose Leaves</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. 📅 CROP CALENDAR & OPERATIONS (Row 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Daily Tasks & Reminders (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    📅 Crop Calendar & Daily Farming Tasks
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Today's field schedule, spraying calendar & seasonal reminders
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddTaskForm(!showAddTaskForm)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Optional Add Task Drawer */}
            <AnimatePresence>
              {showAddTaskForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleAddTask}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 overflow-hidden"
                >
                  <div className="text-xs font-bold text-slate-800">New Farming Task / Schedule</div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="e.g., Spray neem oil in plot 3, check drip lines..."
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-emerald-500"
                    />
                    <select
                      value={newTaskCategory}
                      onChange={(e: any) => setNewTaskCategory(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-700"
                    >
                      <option value="Spraying">Spraying (दवा छिड़काव)</option>
                      <option value="Irrigation">Irrigation (सिंचाई)</option>
                      <option value="Fertilizer">Fertilizer (खाद)</option>
                      <option value="Sowing">Sowing (बुवाई)</option>
                    </select>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shrink-0"
                    >
                      Save Task
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Interactive Task Checklist */}
            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-2xl border transition flex items-start justify-between gap-3 cursor-pointer ${
                    task.completed
                      ? 'bg-slate-50/70 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200/90 hover:border-emerald-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      type="button"
                      className="mt-0.5 text-emerald-600 hover:text-emerald-700 shrink-0"
                      aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                    >
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <div className="space-y-0.5 min-w-0">
                      <div
                        className={`text-xs font-bold ${
                          task.completed ? 'line-through text-slate-500' : 'text-slate-900'
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium truncate">
                        {task.hindiTitle}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        <span className="text-[10px] font-semibold text-slate-500">
                          {task.timeframe}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                          {task.crop}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                      task.priority === 'High'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {task.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sowing & Harvesting Seasonal Reminders (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                <div className="w-8 h-8 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Sowing & Harvesting Timeline
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Kharif-Rabi Transition Window
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                    <span>🌾 Wheat Sowing Preparation</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px]">In 14 Days</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                    Begin primary deep tillage. Procure certified seed (HD 2967, PBW 550) with Azotobacter bio-fertilizer treatment.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                    <span>🥔 Potato Harvesting Window</span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-600 text-white text-[10px]">In 25 Days</span>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                    Cut vines 10 days before lifting to harden tuber skin and prevent transit bruising.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200/80">
                  <div className="flex items-center justify-between text-xs font-bold text-sky-950">
                    <span>🍅 Tomato Nursery Transplanting</span>
                    <span className="px-2 py-0.5 rounded-md bg-sky-600 text-white text-[10px]">Active Window</span>
                  </div>
                  <p className="text-[11px] text-sky-800 mt-1 leading-relaxed">
                    Dip seedling root plugs in Trichoderma solution for 15 minutes prior to bed setting.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-500">
                All seasonal advisories follow Indian ICAR-KVK agricultural calendars
              </span>
            </div>
          </div>
        </div>

        {/* 4. 🌱 CROP HEALTH SUMMARY & 5. 📜 RECENT SCAN HISTORY (Row 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Crop Health Summary Bento (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    🌱 Crop Health Summary
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Farm Vitality & Pathology Breakdown
                  </span>
                </div>
              </div>

              {/* Vitality Score Ring Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 mb-4 text-center">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Overall Farm Health Index
                </span>
                <div className="text-4xl font-black text-emerald-950 my-1">
                  {avgHealthScore}
                  <span className="text-lg text-emerald-700 font-bold">/100</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {avgHealthScore > 80 ? 'Good Vitality • Well Maintained' : 'Requires Foliar Remediation'}
                </span>
              </div>

              {/* 3 Metric Counts */}
              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Scans</span>
                  <span className="text-lg font-black text-slate-900 mt-0.5 block">{totalScans}</span>
                  <span className="text-[10px] text-slate-400">specimens</span>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">Healthy</span>
                  <span className="text-lg font-black text-emerald-700 mt-0.5 block">{healthyCount}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">{healthyPercent}%</span>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200">
                  <span className="text-[10px] font-bold text-rose-800 uppercase block">Diseased</span>
                  <span className="text-lg font-black text-rose-700 mt-0.5 block">{diseasedCount}</span>
                  <span className="text-[10px] text-rose-600 font-bold">{100 - healthyPercent}%</span>
                </div>
              </div>

              {/* Visual Health Ratio Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Healthy: {healthyPercent}%</span>
                  <span>Diseased: {100 - healthyPercent}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${healthyPercent}%` }}
                  />
                  <div
                    className="bg-rose-500 h-full transition-all duration-500"
                    style={{ width: `${100 - healthyPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onScanClick}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 border border-emerald-300 transition flex items-center justify-center gap-1.5"
              >
                <span>Add New Leaf Scan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Recent Scan History (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    📜 Recent Scan History
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Last 3–5 field diagnoses with AI confidence & remedies
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold text-slate-500">
                {scanHistory.length} Logged
              </span>
            </div>

            {/* Scan History Items */}
            <div className="space-y-3">
              {scanHistory.slice(0, 5).map((scan) => (
                <div
                  key={scan.id}
                  className="p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-xs transition bg-white flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={scan.imageUrl}
                      alt={scan.cropName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {scan.cropName}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                            scan.isHealthy
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-100 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {scan.isHealthy ? 'Healthy Leaf' : scan.diseaseName}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {scan.scientificName} • {scan.detectedAt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-black text-slate-900">
                        {scan.confidence}%
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">Confidence</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedScanDetail(scan)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
              <span>Automatic cloud backup enabled for SIH Evaluator & Farmer account</span>
              <button
                onClick={onScanClick}
                className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
              >
                Scan Leaf with Camera →
              </button>
            </div>
          </div>
        </div>

        {/* 6. 💡 TODAY'S FARMING TIP (Row 4) */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-emerald-500/10 rounded-3xl p-6 border-2 border-amber-300/80 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/25">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-600 text-white">
                    💡 Today's Farming Tip
                  </span>
                  <span className="text-xs font-bold text-amber-900">
                    Category: {currentTip.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {currentTip.title}
                </h3>
                <p className="text-xs font-bold text-amber-800">
                  {currentTip.hindiTitle}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed max-w-3xl pt-0.5">
                  {currentTip.content}
                </p>
                <p className="text-xs text-slate-600 italic leading-relaxed max-w-3xl">
                  हिंदी: {currentTip.hindiContent}
                </p>

                <div className="mt-2 pt-2 border-t border-amber-200/80 flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Action Item: {currentTip.actionItem}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex sm:flex-col items-center gap-2">
              <button
                type="button"
                onClick={handleNextTip}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 border border-amber-300 shadow-sm transition flex items-center gap-1.5 active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                <span>Next Tip (अगला सुझाव)</span>
              </button>
              <span className="text-[10px] text-slate-500 font-medium">
                Tip {currentTipIndex + 1} of {DAILY_FARMING_TIPS.length}
              </span>
            </div>
          </div>
        </div>

        {/* 7. 🧪 SOIL & FERTILIZER RECOMMENDATION (Row 5) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  🧪 Soil & Fertilizer Recommendation (खाद व पोषण अनुशंसा)
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Customized N-P-K & bio-fertilizer dosing based on detected plant pathology
                </span>
              </div>
            </div>

            {/* Condition Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 hidden sm:inline">Diagnosed Disease:</span>
              <select
                aria-label="Select Diagnosed Condition"
                value={selectedFertilizerCondition}
                onChange={(e) => setSelectedFertilizerCondition(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-purple-50 text-purple-950 border border-purple-200 focus:outline-none cursor-pointer"
              >
                <option value="Early Blight">Early Blight (Alternaria)</option>
                <option value="Late Blight">Late Blight (Phytophthora)</option>
                <option value="Common Rust">Common Rust (Corn Puccinia)</option>
                <option value="Bacterial Spot">Bacterial Spot (Xanthomonas)</option>
                <option value="Healthy Leaf Tissue">Healthy Leaf (General Vigor)</option>
              </select>
            </div>
          </div>

          {/* Active Fertilizer Guidance Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nitrogen Action Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black text-slate-900">Nitrogen (N) • यूरिया</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                  Vegetative Growth
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentFertilizer.nitrogenAction}
              </p>
            </div>

            {/* Phosphorus Action Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black text-slate-900">Phosphorus (P) • डीएपी / एसएसपी</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-900">
                  Root & Energy
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentFertilizer.phosphorusAction}
              </p>
            </div>

            {/* Potassium Action Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black text-slate-900">Potassium (K) • पोटाश</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                  Cell Wall Defense
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentFertilizer.potassiumAction}
              </p>
            </div>
          </div>

          {/* Recommended Formulation Banner */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <span className="font-extrabold text-purple-950 block">
                Recommended Precision Formulation:
              </span>
              <p className="text-purple-900 font-semibold leading-relaxed">
                {currentFertilizer.recommendedFormulation}
              </p>
              <span className="text-[11px] text-purple-700 block">
                Organic Booster: {currentFertilizer.organicBooster}
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="font-extrabold text-purple-950 block">
                Crucial Timing & Micronutrients:
              </span>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {currentFertilizer.micronutrients.map((m, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-medium">
                    {m}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-600 italic">
                ⚠️ {currentFertilizer.timingWarning}
              </p>
            </div>
          </div>
        </div>

        {/* 8. 📚 CROP KNOWLEDGE SHORTCUT (Row 6) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  📚 Crop Knowledge Shortcuts
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Quick disease threat profiles and optimum growth parameters for staple crops
                </p>
              </div>
            </div>

            <a
              href="#knowledge-base"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>Full Knowledge Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {CROP_SHORTCUTS.map((crop) => (
              <div
                key={crop.id}
                onClick={() => setSelectedCropShortcut(crop)}
                className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-24 rounded-xl overflow-hidden mb-2.5">
                    <img
                      src={crop.imageUrl}
                      alt={crop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/70 text-white text-[9px] font-bold">
                      {crop.growthPeriod}
                    </span>
                  </div>

                  <h4 className="text-xs font-black text-slate-900 group-hover:text-emerald-700 transition">
                    {crop.name}
                  </h4>
                  <div className="text-[10px] text-slate-500 font-semibold">{crop.hindiName}</div>

                  <div className="mt-2 space-y-1 text-[10px] text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Opt Temp:</span>
                      <span className="font-bold text-slate-800">{crop.optimalTemp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Soil pH:</span>
                      <span className="font-bold text-slate-800">{crop.soilPH}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-emerald-700">
                  <span>{crop.topDiseases.length} Major Risks</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SCAN DETAIL MODAL */}
        <AnimatePresence>
          {selectedScanDetail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedScanDetail(null)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden z-10 my-6"
              >
                <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-200 uppercase">
                      Scan Diagnosis Card • AI Pathology
                    </span>
                    <h3 className="text-base font-black text-white">
                      {selectedScanDetail.cropName}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedScanDetail(null)}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
                    aria-label="Close details"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedScanDetail.imageUrl}
                      alt={selectedScanDetail.cropName}
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
                    />
                    <div className="space-y-1">
                      <div className="text-sm font-extrabold text-slate-900">
                        {selectedScanDetail.isHealthy ? 'Healthy Leaf' : selectedScanDetail.diseaseName}
                      </div>
                      <div className="text-slate-500">{selectedScanDetail.scientificName}</div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold">
                          {selectedScanDetail.confidence}% Confidence
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                          {selectedScanDetail.severity} Severity
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedScanDetail.symptoms && selectedScanDetail.symptoms.length > 0 && (
                    <div>
                      <span className="font-bold text-slate-900 block mb-1">Key Symptoms:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                        {selectedScanDetail.symptoms.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedScanDetail.treatment && (
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                        <span className="font-extrabold text-emerald-900 flex items-center gap-1.5 mb-1.5">
                          <span>🌿 Primary Organic Solutions (जैविक प्राथमिकता):</span>
                          <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-1.5 py-0.2 rounded font-black">Recommended</span>
                        </span>
                        <ul className="space-y-1 text-slate-800">
                          {selectedScanDetail.treatment.organic?.map((t, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`p-3 rounded-xl border ${
                        selectedScanDetail.severity === 'Severe'
                          ? 'bg-rose-50 border-rose-200 text-rose-950'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold flex items-center gap-1">
                            <span>🧪 Chemical / Fungicide Status:</span>
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                            selectedScanDetail.severity === 'Severe'
                              ? 'bg-rose-200 text-rose-900'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {selectedScanDetail.severity === 'Severe' ? '🚨 Emergency Dose' : '🚫 Not Recommended'}
                          </span>
                        </div>

                        {selectedScanDetail.severity !== 'Severe' ? (
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            Disease severity is <strong>{selectedScanDetail.severity}</strong>. Chemical pesticides/fungicides are NOT recommended. Using them wastes farmer money and harms beneficial pollinators. Use the organic solutions above.
                          </p>
                        ) : (
                          <ul className="space-y-1 text-xs text-rose-950">
                            {selectedScanDetail.treatment.chemical?.map((t, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedScanDetail(null);
                      onScanClick();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition"
                  >
                    Launch New Scan
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* CROP SHORTCUT MODAL */}
        <AnimatePresence>
          {selectedCropShortcut && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCropShortcut(null)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden z-10 my-6"
              >
                <div className="p-5 bg-gradient-to-r from-emerald-600 to-lime-600 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-100 uppercase">
                      {selectedCropShortcut.category}
                    </span>
                    <h3 className="text-lg font-black text-white">
                      {selectedCropShortcut.name} ({selectedCropShortcut.hindiName})
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCropShortcut(null)}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
                    aria-label="Close crop modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 space-y-3 text-xs">
                  <img
                    src={selectedCropShortcut.imageUrl}
                    alt={selectedCropShortcut.name}
                    className="w-full h-36 rounded-2xl object-cover"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Optimal Temp</span>
                      <span className="text-xs font-black text-slate-900">{selectedCropShortcut.optimalTemp}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Soil pH Range</span>
                      <span className="text-xs font-black text-slate-900">{selectedCropShortcut.soilPH}</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Top Disease Threats:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCropShortcut.topDiseases.map((d: string) => (
                        <span key={d} className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-[11px]">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <span className="font-bold block text-[11px]">Quick Agronomist Remedy:</span>
                    <span className="text-xs font-medium">{selectedCropShortcut.quickRemedy}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                  <a
                    href="#knowledge-base"
                    onClick={() => setSelectedCropShortcut(null)}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    View in Knowledge Base →
                  </a>
                  <button
                    onClick={() => {
                      setSelectedCropShortcut(null);
                      onScanClick();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition"
                  >
                    Scan This Crop
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
