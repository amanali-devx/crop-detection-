import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Clock,
  Coins,
  Beaker,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  FileText,
  Copy,
  Check,
  Languages,
  Calendar,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { PredictionResult } from '../types';
import {
  getTreatmentGuide,
  DiseaseTreatmentGuide,
  OrganicSolutionItem,
  ChemicalSolutionItem,
} from '../data/treatmentGuideData';

interface FarmerDiseaseSolutionGuideProps {
  prediction: PredictionResult;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export const FarmerDiseaseSolutionGuide = ({
  prediction,
  onShowToast,
}: FarmerDiseaseSolutionGuideProps) => {
  // Language toggle: Hindi (default for Indian farmers) or English
  const [lang, setLang] = useState<'hi' | 'en'>('hi');

  // Tank size for dosage calculator: 15L (Knapsack), 20L, 50L (Power spray), 200L (Tractor)
  const [tankSize, setTankSize] = useState<number>(15);

  // Toggle for chemical emergency view when severity is not severe
  const [showEmergencyChemical, setShowEmergencyChemical] = useState<boolean>(false);

  // Selected organic item detail expansion
  const [expandedOrganicId, setExpandedOrganicId] = useState<string | null>(null);

  // Copy status
  const [copied, setCopied] = useState<boolean>(false);

  const guide: DiseaseTreatmentGuide = getTreatmentGuide(
    prediction.diseaseName,
    prediction.cropName,
    prediction.isHealthy
  );

  const isSevere = prediction.severity === 'Severe';
  const isModerate = prediction.severity === 'Moderate';
  const isMild = prediction.severity === 'Mild';
  const isHealthy = prediction.isHealthy;

  const handleCopyGuide = () => {
    const textToCopy = `🌾 FARMERDETECT AI - किसान रोग समाधान पर्ची
फसल: ${prediction.cropName} | रोग: ${prediction.diseaseName}
संक्रमण स्तर: ${prediction.severity} (${isHealthy ? 'स्वस्थ' : isSevere ? 'गंभीर' : isModerate ? 'मध्यम' : 'हल्का'})

🌿 प्राथमिक जैविक उपचार (ORGANIC FIRST):
${guide.organicSolutions
  .map(
    (o, i) =>
      `${i + 1}. ${o.nameHi} (${o.nameEn})
   - मात्रा: ${o.dosagePerLiter} (${(o.dosageUnitPerLiter * 15).toFixed(0)} ${o.unitType} प्रति 15L पंप)
   - विधि: ${o.preparationHi}
   - समय: ${o.timingHi}`
  )
  .join('\n\n')}

🧪 रासायनिक कीटनाशक / कवकनाशी सलाह (CHEMICAL STATUS):
${
  isSevere
    ? `🚨 गंभीर संक्रमण - तत्काल सुरक्षा:
${guide.chemicalSolutions
  .map(
    (c, i) =>
      `${i + 1}. ${c.chemicalName}
   - मात्रा: ${c.dosagePerLiter}
   - सावधानी: ${c.safetyPrecautionsHi}
   - तुड़ाई प्रतीक्षा (PHI): ${c.preHarvestIntervalDays} दिन`
  )
  .join('\n')}`
    : `✅ रासायनिक कीटनाशक की आवश्यकता नहीं है! रोग अभी जैविक उपायों से पूरी तरह नियंत्रित हो सकता है।`
}

📅 7-दिवसीय किसान एक्शन प्लान:
- दिन 1: ${guide.timelinePlan.day1Hi}
- दिन 3: ${guide.timelinePlan.day3Hi}
- दिन 7: ${guide.timelinePlan.day7Hi}
`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    if (onShowToast) {
      onShowToast('success', 'समाधान कॉपी हो गया', 'किसान रोग समाधान पर्ची क्लिपबोर्ड में कॉपी हो गई है।');
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div
      id="farmer-advisory-guide"
      className="mt-6 rounded-3xl border border-emerald-200 bg-gradient-to-b from-white via-emerald-50/20 to-white p-5 sm:p-7 shadow-xl shadow-emerald-950/5 relative overflow-hidden"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-lime-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Bilingual Switch */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {lang === 'hi' ? 'किसान परामर्श व समाधान' : 'Farmer Action & Solution Guide'}
              </span>
              <span className="text-xs text-emerald-600 font-semibold">• ICAR & Vedic Agronomy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              {lang === 'hi' ? 'फसल रोग समाधान मार्गदर्शिका' : 'Crop Disease Solution Protocol'}
            </h3>
          </div>
        </div>

        {/* Controls: Language Switch + Print + Copy */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                lang === 'hi'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>हिंदी</span>
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lang === 'en'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>English</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyGuide}
            className="p-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition shadow-xs flex items-center gap-1"
            title={lang === 'hi' ? 'सलाह कॉपी करें' : 'Copy Guide'}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? (lang === 'hi' ? 'कॉपी हो गया' : 'Copied!') : (lang === 'hi' ? 'कॉपी' : 'Copy')}</span>
          </button>

          <button
            type="button"
            onClick={handlePrintSlip}
            className="p-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition shadow-xs flex items-center gap-1"
            title={lang === 'hi' ? 'पर्ची प्रिंट करें' : 'Print Slip'}
          >
            <FileText className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">{lang === 'hi' ? 'प्रिंट' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Severity Strategy Banner */}
      <div className="relative z-10 mt-5">
        {isHealthy ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950">
                {lang === 'hi' ? '🌿 फसल 100% स्वस्थ है - किसी कीटनाशक की जरूरत नहीं!' : '🌿 Foliage is 100% Healthy - No Pesticides Needed!'}
              </h4>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                {lang === 'hi'
                  ? 'पत्तियों में कोई बीमारी नहीं पाई गई है। रासायनिक कीटनाशक बिल्कुल न डालें। फसल को मजबूत रखने के लिए केवल नीचे दिए गए जैविक टॉनिक (जीवामृत या नीम अर्क) का नियमित प्रयोग करें।'
                  : 'Zero pathogen invasion detected. Keep costs low and maintain organic soil health with preventive bio-tonics only.'}
              </p>
            </div>
          </div>
        ) : isMild ? (
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-teal-200 text-teal-900">
                  {lang === 'hi' ? 'हल्का संक्रमण (Mild Severity)' : 'Mild Stage'}
                </span>
                <span className="text-xs font-bold text-teal-800">
                  {lang === 'hi' ? '• 100% जैविक समाधान पर्याप्त है' : '• 100% Organic Controls Sufficient'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-teal-950 mt-1">
                {lang === 'hi'
                  ? 'रासायनिक कीटनाशक की कोई आवश्यकता नहीं है (Chemicals NOT Recommended)'
                  : 'Chemical Pesticides Not Recommended - Treat Organically'}
              </h4>
              <p className="text-xs text-teal-800 mt-0.5 leading-relaxed">
                {lang === 'hi'
                  ? 'संक्रमण अभी शुरुआती चरण में है। केवल 2% नीम तेल व ट्राइकोडर्मा बायो-कवकनाशी से यह 100% ठीक हो जाएगा। जहरीले केमिकल पर पैसे खर्च न करें!'
                  : 'The infection is at an early localized stage. Standard bio-remedies (Neem oil, Trichoderma) will completely resolve it without harsh chemicals.'}
              </p>
            </div>
          </div>
        ) : isModerate ? (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                  {lang === 'hi' ? 'मध्यम संक्रमण (Moderate Severity)' : 'Moderate Severity'}
                </span>
                <span className="text-xs font-bold text-amber-800">
                  {lang === 'hi' ? '• पहले जैविक उपाय अपनाएं' : '• Try Organic Protocol First'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-amber-950 mt-1">
                {lang === 'hi'
                  ? 'प्राथमिकता जैविक उपचार को दें (3-5 दिन का मौका दें)'
                  : 'Prioritize Organic Treatment (Give 3-5 Days Trial)'}
              </h4>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                {lang === 'hi'
                  ? 'पहले नीम तेल + ट्राइकोडर्मा या खट्टी छाछ का छिड़काव करें। यदि 3-5 दिन में मौसम लगातार नम रहे और संक्रमण 30% से अधिक फैले, तभी रासायनिक दवा का प्रयोग करें।'
                  : 'Apply organic bio-fungicides first. Reserve synthetic chemical sprays only if severe persistent rain causes uncontrolled disease spread.'}
              </p>
            </div>
          </div>
        ) : (
          /* SEVERE EMERGENCY ALERT */
          <div className="p-4.5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 flex items-start gap-3 shadow-md shadow-rose-950/5">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/25 animate-pulse">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-rose-200 text-rose-900 border border-rose-300">
                  {lang === 'hi' ? '🚨 गंभीर संक्रमण (Severe Emergency)' : '🚨 Severe Critical Stage'}
                </span>
                <span className="text-xs font-bold text-rose-700">
                  {lang === 'hi' ? '• तत्काल फसल सुरक्षा आवश्यक' : '• Immediate Rescue Spray Needed'}
                </span>
              </div>
              <h4 className="text-base font-black text-rose-950 mt-1">
                {lang === 'hi'
                  ? 'संक्रमण गंभीर है - फसल बचाने के लिए अनुशंसित रासायनिक कवकनाशी का प्रयोग करें!'
                  : 'Severe Pathogen Pressure - Approved Chemical Fungicide Recommended!'}
              </h4>
              <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                {lang === 'hi'
                  ? 'क्योंकि रोग पत्तियों व तने में गहरा फैल चुका है, पैदावार बचाने के लिए अनुमोदित कवकनाशी (ICAR/CIBRC approved) का निर्धारित मात्रा में सुरक्षा मास्क पहनकर तुरंत छिड़काव करें, और साथ ही रोगग्रस्त भागों को काटकर नष्ट करें।'
                  : 'The pathogen has breached plant vascular layers. Apply ICAR-approved curative fungicide with exact calibrated dosage and protective gear to avert heavy yield loss.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sprayer Tank Dosage Calculator - Extremely useful for real farmers! */}
      <div className="relative z-10 mt-5 rounded-2xl bg-white border border-emerald-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                {lang === 'hi' ? '🚜 स्प्रेयर पंप डोज कैलकुलेटर' : '🚜 Sprayer Tank Dosage Calculator'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {lang === 'hi'
                  ? 'अपने पंप का आकार चुनें, आवश्यक दवा की मात्रा तुरंत देखें:'
                  : 'Select your sprayer size to instantly calculate mixing quantities:'}
              </p>
            </div>
          </div>

          {/* Tank Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {[
              { size: 15, label: lang === 'hi' ? '15L (पीठ वाला पंप)' : '15L (Knapsack)' },
              { size: 20, label: lang === 'hi' ? '20L (बैटरी पंप)' : '20L (Battery)' },
              { size: 50, label: lang === 'hi' ? '50L (ड्रम / पावर)' : '50L (Power)' },
              { size: 200, label: lang === 'hi' ? '200L (ट्रैक्टर टैंक)' : '200L (Tractor)' },
            ].map((t) => (
              <button
                key={t.size}
                type="button"
                onClick={() => setTankSize(t.size)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  tankSize === t.size
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calculated Dosage Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-slate-100">
          {/* Neem oil */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5">
            <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
              {lang === 'hi' ? 'नीम तेल (5ml/L)' : 'Neem Oil (5ml/L)'}
            </div>
            <div className="text-lg font-black text-emerald-950 mt-0.5">
              {(tankSize * 5).toFixed(0)} <span className="text-xs font-bold text-emerald-700">ml</span>
            </div>
            <div className="text-[10px] text-emerald-700/80 mt-0.5">
              {lang === 'hi' ? `+ ${(tankSize * 2).toFixed(0)}ml साबुन घोल` : `+ ${(tankSize * 2).toFixed(0)}ml soap`}
            </div>
          </div>

          {/* Trichoderma / Bio */}
          <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-2.5">
            <div className="text-[10px] font-bold text-teal-800 uppercase tracking-wide">
              {lang === 'hi' ? 'ट्राइकोडर्मा (5g/L)' : 'Trichoderma (5g/L)'}
            </div>
            <div className="text-lg font-black text-teal-950 mt-0.5">
              {(tankSize * 5).toFixed(0)} <span className="text-xs font-bold text-teal-700">g</span>
            </div>
            <div className="text-[10px] text-teal-700/80 mt-0.5">
              {lang === 'hi' ? 'गुड़ के पानी में घोलें' : 'Mix with jaggery water'}
            </div>
          </div>

          {/* Buttermilk */}
          <div className="bg-lime-50/70 border border-lime-200/80 rounded-xl p-2.5">
            <div className="text-[10px] font-bold text-lime-900 uppercase tracking-wide">
              {lang === 'hi' ? 'खट्टी छाछ (1:10)' : 'Sour Buttermilk (1:10)'}
            </div>
            <div className="text-lg font-black text-lime-950 mt-0.5">
              {(tankSize * 0.1).toFixed(1)} <span className="text-xs font-bold text-lime-800">{lang === 'hi' ? 'लीटर' : 'Litre'}</span>
            </div>
            <div className="text-[10px] text-lime-800/80 mt-0.5">
              {lang === 'hi' ? 'तांबे के पात्र में सड़ी हुई' : 'Fermented in copper pot'}
            </div>
          </div>

          {/* Chemical Dose (if severe, otherwise marked Not Recommended) */}
          <div
            className={`rounded-xl p-2.5 border ${
              isSevere
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wide">
              {lang === 'hi' ? 'कवकनाशी (2.5g/L)' : 'Chemical Fungicide (2.5g/L)'}
            </div>
            {isSevere ? (
              <>
                <div className="text-lg font-black text-rose-950 mt-0.5">
                  {(tankSize * 2.5).toFixed(0)} <span className="text-xs font-bold text-rose-700">g</span>
                </div>
                <div className="text-[10px] text-rose-700 font-semibold mt-0.5">
                  {lang === 'hi' ? '🚨 केवल गंभीर अवस्था में' : '🚨 Severe Stage Only'}
                </div>
              </>
            ) : (
              <>
                <div className="text-xs font-bold text-slate-600 mt-1">
                  {lang === 'hi' ? '🚫 जरूरत नहीं है' : '🚫 Not Needed'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {lang === 'hi' ? 'हल्के रोग में न डालें' : 'Zero chemicals needed'}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 1: ORGANIC SOLUTIONS (PRIMARY FOCUS - ALWAYS PROMINENT) */}
      <div className="relative z-10 mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-6 rounded-full bg-emerald-600" />
            <h4 className="text-base sm:text-lg font-black text-slate-900">
              {lang === 'hi' ? '🌿 प्राथमिक जैविक समाधान (100% Organic Solutions)' : '🌿 Primary Organic Solutions (Zero Toxic Residue)'}
            </h4>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
            {lang === 'hi' ? 'पहला कदम • जैविक प्राथमिकता' : 'Step 1 • Organic First'}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {lang === 'hi'
            ? 'हमेशा पहले जैविक उपचार अपनाएं। ये उपाय फसल को नुकसान पहुंचाए बिना फंगस और बैक्टीरिया को खत्म करते हैं, मिट्टी को उपजाऊ रखते हैं और आपकी लागत बचाते हैं।'
            : 'Always prioritize organic bio-remedies. They eliminate pathogens without killing beneficial pollinators, leaving zero toxic residue on edible produce.'}
        </p>

        {/* Organic Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {guide.organicSolutions.map((item, index) => {
            const isExpanded = expandedOrganicId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-emerald-200/90 bg-white p-4 shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Number */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h5 className="text-sm font-extrabold text-slate-900">
                    {lang === 'hi' ? item.nameHi : item.nameEn}
                  </h5>

                  {/* Quick stats: Dosage & Cost */}
                  <div className="flex flex-wrap items-center gap-2 mt-2.5">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                      <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.dosagePerLiter}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                      <Coins className="w-3 h-3 text-amber-600" />
                      <span>{item.costRating}</span>
                    </span>
                  </div>

                  {/* Preparation description */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      <Beaker className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{lang === 'hi' ? 'बनाने व घोलने की विधि:' : 'Preparation Method:'}</span>
                    </div>
                    <p className="leading-relaxed">
                      {lang === 'hi' ? item.preparationHi : item.preparationEn}
                    </p>
                  </div>

                  {/* Timing & Benefits (expandable or default view) */}
                  <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>{lang === 'hi' ? 'समय:' : 'Timing:'}</strong>{' '}
                        {lang === 'hi' ? item.timingHi : item.timingEn}
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>{lang === 'hi' ? 'लाभ:' : 'Key Benefit:'}</strong>{' '}
                        {lang === 'hi' ? item.benefitsHi : item.benefitsEn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Per Tank Quick Note */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
                  <span>{lang === 'hi' ? `15L पंप हेतु:` : `For 15L Knapsack Tank:`}</span>
                  <span className="font-extrabold text-emerald-950 bg-emerald-100/70 px-2 py-0.5 rounded">
                    {(item.dosageUnitPerLiter * 15).toFixed(0)} {item.unitType}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: CHEMICAL PESTICIDE/FUNGICIDE (STRICTLY SEVERE CONDITIONAL) */}
      <div className="relative z-10 mt-8 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-6 rounded-full ${
                isSevere ? 'bg-rose-600' : 'bg-slate-400'
              }`}
            />
            <h4 className="text-base sm:text-lg font-black text-slate-900">
              {lang === 'hi'
                ? '🧪 रासायनिक कीटनाशक / कवकनाशी (Chemical Solutions)'
                : '🧪 Synthetic Chemical Pesticides / Fungicides'}
            </h4>
          </div>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border ${
              isSevere
                ? 'bg-rose-100 text-rose-800 border-rose-300'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {isSevere
              ? lang === 'hi'
                ? '🚨 गंभीर अवस्था में अनिवार्य'
                : '🚨 Severe Emergency Protocol'
              : lang === 'hi'
              ? '🚫 अभी अनुशंसित नहीं (Not Needed)'
              : '🚫 Not Recommended for Mild'}
          </span>
        </div>

        {/* Conditional Chemical Handling */}
        {!isSevere ? (
          /* When NOT Severe: Show clear notice and lock/collapsed state */
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-slate-900">
                  {lang === 'hi'
                    ? 'रासायनिक कीटनाशक छिड़कने की कोई आवश्यकता नहीं है'
                    : 'Chemical Sprays are NOT Required at this Stage'}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'hi'
                    ? 'क्योंकि आपकी फसल में संक्रमण गंभीर नहीं है, जहरीले रासायनिक कवकनाशी छिड़कने से मित्र कीट मरेंगे, मिट्टी खराब होगी और पैसे की बर्बादी होगी। केवल ऊपर दिए गए जैविक घोल का छिड़काव करें।'
                    : 'Chemical intervention at mild or moderate stages is wasteful, damages honeybees, and accelerates pathogen resistance. Follow the organic remedies above.'}
                </p>
              </div>
            </div>

            {/* Toggle button to show emergency chemicals if farmer wants backup info */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 italic">
                {lang === 'hi'
                  ? 'यदि 3-5 दिन में रोग अनियंत्रित होकर 30% से अधिक फैले, तभी रासायनिक बैकअप देखें:'
                  : 'If infection spreads uncontrollably beyond 30% foliage, reveal emergency backup:'}
              </span>
              <button
                type="button"
                onClick={() => setShowEmergencyChemical(!showEmergencyChemical)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition"
              >
                <span>
                  {showEmergencyChemical
                    ? lang === 'hi'
                      ? 'रासायनिक जानकारी छुपाएं'
                      : 'Hide Emergency Chemicals'
                    : lang === 'hi'
                    ? 'आपातकालीन बैकअप देखें'
                    : 'View Emergency Backup'}
                </span>
                {showEmergencyChemical ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Collapsible emergency chemical details */}
            <AnimatePresence>
              {showEmergencyChemical && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 pt-3 border-t border-dashed border-slate-200 overflow-hidden"
                >
                  <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs font-medium border border-amber-200">
                    ⚠️ {lang === 'hi' ? 'ध्यान दें: इसे केवल आपातकालीन अंतिम विकल्प के रूप में ही प्रयोग करें।' : 'Note: Only deploy as a last-resort contingency if organic bio-sprays fail.'}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {guide.chemicalSolutions.map((chem) => (
                      <div key={chem.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1.5">
                        <div className="font-black text-slate-900 text-sm">{chem.chemicalName}</div>
                        <div className="text-slate-600"><strong>{lang === 'hi' ? 'बाजार नाम:' : 'Trade Names:'}</strong> {chem.tradeNames}</div>
                        <div className="text-emerald-800 font-bold"><strong>{lang === 'hi' ? 'मात्रा:' : 'Dosage:'}</strong> {chem.dosagePerLiter}</div>
                        <div className="text-slate-600"><strong>{lang === 'hi' ? 'तुड़ाई प्रतीक्षा (PHI):' : 'Pre-Harvest:'}</strong> {chem.preHarvestIntervalDays} {lang === 'hi' ? 'दिन' : 'Days'}</div>
                        <p className="text-slate-600 text-[11px] leading-relaxed pt-1 border-t border-slate-200">
                          {lang === 'hi' ? chem.instructionHi : chem.instructionEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* When SEVERE: Prominently display verified chemical protocols */
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                {lang === 'hi'
                  ? 'रोग गंभीर स्तर पर है। तत्काल फसल बचाने हेतु नीचे दी गई दवा की निर्धारित मात्रा का ही छिड़काव करें। सुरक्षा हेतु मास्क व दस्ताने जरूर पहनें।'
                  : 'Infection is critical. Apply calibrated dose below with safety mask and respect pre-harvest waiting days.'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {guide.chemicalSolutions.map((chem) => (
                <div
                  key={chem.id}
                  className="rounded-2xl border-2 border-rose-200 bg-white p-4.5 shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                        ICAR / CIBRC Approved
                      </span>
                      <h5 className="text-sm font-black text-slate-900 mt-1">
                        {chem.chemicalName}
                      </h5>
                    </div>

                    <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 shrink-0">
                      {chem.toxicityClass}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-700">
                    <div>
                      <strong>{lang === 'hi' ? 'व्यापारिक ब्रांड नाम:' : 'Popular Brands:'}</strong>{' '}
                      <span className="text-slate-900 font-semibold">{chem.tradeNames}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-rose-900 font-black bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {chem.dosagePerLiter}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        ({(chem.dosageUnitPerLiter * 15).toFixed(1)} {chem.unitType} / 15L Pump)
                      </span>
                    </div>

                    <div className="text-[11px] text-amber-900 font-semibold pt-1">
                      ⏳ {lang === 'hi' ? 'तुड़ाई प्रतीक्षा समय (Pre-Harvest Interval):' : 'Pre-Harvest Interval (PHI):'}{' '}
                      <span className="font-extrabold">{chem.preHarvestIntervalDays} {lang === 'hi' ? 'दिन' : 'Days'}</span>
                      <span className="text-[10px] text-slate-500 block font-normal">
                        {lang === 'hi' ? '(छिड़काव के इतने दिन बाद ही फसल की तुड़ाई करें)' : '(Wait this many days before harvesting fruits)'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                    {lang === 'hi' ? chem.instructionHi : chem.instructionEn}
                  </p>

                  <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>{lang === 'hi' ? 'सुरक्षा नियम:' : 'Safety Caution:'}</strong>{' '}
                      {lang === 'hi' ? chem.safetyPrecautionsHi : chem.safetyPrecautionsEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: 7-DAY STEP-BY-STEP FARMER ACTION PLAN */}
      <div className="relative z-10 mt-8 rounded-2xl bg-white border border-emerald-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-700" />
          <h4 className="text-sm sm:text-base font-black text-slate-900">
            {lang === 'hi' ? '📅 7-दिवसीय किसान एक्शन प्लान (Step-by-Step Schedule)' : '📅 7-Day Step-by-Step Action Schedule'}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Day 1 */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
            <div className="text-[11px] font-black uppercase text-emerald-800 flex items-center justify-between">
              <span>{lang === 'hi' ? 'दिन 1 (आज ही करें)' : 'Day 1 (Immediate)'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {lang === 'hi' ? guide.timelinePlan.day1Hi : guide.timelinePlan.day1En}
            </p>
          </div>

          {/* Day 3 */}
          <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200/80 space-y-1">
            <div className="text-[11px] font-black uppercase text-teal-800 flex items-center justify-between">
              <span>{lang === 'hi' ? 'दिन 3 (फॉलोअप)' : 'Day 3 (Follow-up)'}</span>
              <span className="w-2 h-2 rounded-full bg-teal-600" />
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {lang === 'hi' ? guide.timelinePlan.day3Hi : guide.timelinePlan.day3En}
            </p>
          </div>

          {/* Day 7 */}
          <div className="p-3 rounded-xl bg-lime-50/70 border border-lime-200/80 space-y-1">
            <div className="text-[11px] font-black uppercase text-lime-900 flex items-center justify-between">
              <span>{lang === 'hi' ? 'दिन 7 (निरीक्षण)' : 'Day 7 (Assessment)'}</span>
              <span className="w-2 h-2 rounded-full bg-lime-600" />
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {lang === 'hi' ? guide.timelinePlan.day7Hi : guide.timelinePlan.day7En}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: PERMANENT AGRONOMIC PREVENTION RULES */}
      <div className="relative z-10 mt-4 p-4 rounded-2xl bg-emerald-950 text-white space-y-2">
        <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          {lang === 'hi' ? 'भविष्य में रोग से बचाव के 3 सुनहरे नियम:' : '3 Golden Agronomic Prevention Rules:'}
        </h5>
        <ul className="space-y-1.5 text-xs text-slate-200">
          {(lang === 'hi' ? guide.preventionRulesHi : guide.preventionRulesEn).map((rule, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
