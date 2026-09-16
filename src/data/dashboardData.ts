import { PredictionResult } from '../types';

export interface ScanHistoryRecord {
  id: string;
  cropName: string;
  diseaseName: string;
  scientificName: string;
  isHealthy: boolean;
  confidence: number;
  severity: 'Healthy' | 'Mild' | 'Moderate' | 'Severe';
  detectedAt: string;
  imageUrl: string;
  symptoms: string[];
  treatment: {
    organic: string[];
    chemical: string[];
    prevention: string[];
  };
  cropHealthScore: number;
}

export interface WeatherData {
  region: string;
  state: string;
  temperature: number; // in Celsius
  condition: string;
  humidity: number; // percentage
  rainChance: number; // percentage
  windSpeed: number; // km/h
  soilMoisture: number; // percentage
  uvIndex: number;
  forecast: {
    day: string;
    condition: string;
    high: number;
    low: number;
    rainProb: number;
  }[];
  farmingAdvisory: string;
  hindiAdvisory: string;
  diseaseRiskAlert: {
    active: boolean;
    level: 'High' | 'Moderate' | 'Low';
    title: string;
    hindiTitle: string;
    reason: string;
    affectedCrops: string[];
    preventiveSteps: string[];
  };
}

export interface CalendarTask {
  id: string;
  title: string;
  hindiTitle: string;
  crop: string;
  timeframe: string;
  category: 'Irrigation' | 'Spraying' | 'Fertilizer' | 'Harvesting' | 'Sowing';
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export interface FarmingTip {
  id: string;
  category: 'Irrigation' | 'Fertilizer' | 'Pest Prevention' | 'Soil Health';
  title: string;
  hindiTitle: string;
  content: string;
  hindiContent: string;
  actionItem: string;
}

export interface FertilizerRecommendation {
  conditionKey: string;
  cropOrDisease: string;
  status: 'Infected' | 'Healthy' | 'Deficiency';
  nitrogenAction: string;
  phosphorusAction: string;
  potassiumAction: string;
  recommendedFormulation: string;
  organicBooster: string;
  micronutrients: string[];
  timingWarning: string;
}

export interface CropShortcut {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  imageUrl: string;
  optimalTemp: string;
  soilPH: string;
  topDiseases: string[];
  quickRemedy: string;
  growthPeriod: string;
}

export const REGIONAL_WEATHER: Record<string, WeatherData> = {
  'pune': {
    region: 'Pune / Nashik Cluster',
    state: 'Maharashtra',
    temperature: 28,
    condition: 'Humid Overcast',
    humidity: 84,
    rainChance: 68,
    windSpeed: 14,
    soilMoisture: 72,
    uvIndex: 6,
    forecast: [
      { day: 'Today', condition: 'Scattered Showers', high: 29, low: 22, rainProb: 68 },
      { day: 'Tomorrow', condition: 'Moderate Rain', high: 27, low: 21, rainProb: 75 },
      { day: 'Day 3', condition: 'Partly Cloudy', high: 30, low: 22, rainProb: 40 },
    ],
    farmingAdvisory: 'High humidity (>80%) creates ideal conditions for fungal spore germination (Early/Late Blight & Downy Mildew). Withhold overhead sprinkler irrigation. Spray prophylactic bio-fungicide (Trichoderma viride or Copper Oxychloride 50% WP @ 2.5g/L) during afternoon break. Inspect field drainage channels.',
    hindiAdvisory: 'अत्यधिक आर्द्रता (84%) कवक (Fungus) रोगों जैसे अगेती/पछेती झुलसा के लिए अनुकूल है। ऊपर से फव्वारा सिंचाई न करें। कॉपर ऑक्सीक्लोराइड या ट्राइकोडर्मा का छिड़काव करें।',
    diseaseRiskAlert: {
      active: true,
      level: 'High',
      title: 'High Humidity Today – Fungal Disease Risk Alert',
      hindiTitle: 'आज उच्च आर्द्रता (84%) – फंगल और झुलसा रोग का भारी जोखिम!',
      reason: 'Persistent relative humidity over 80% with intermittent cloud cover accelerates Phytophthora and Alternaria spore dissemination across Solanaceous crops.',
      affectedCrops: ['Potato', 'Tomato', 'Grapes', 'Chilli'],
      preventiveSteps: [
        'Apply systemic bio-fungicide (Trichoderma @ 5g/L) or Copper Oxychloride before evening rain.',
        'Avoid excess chemical Nitrogen (Urea) which weakens foliage cuticle.',
        'Prune bottom 15cm leaves touching moist soil to cut off ground spore splash.',
      ],
    },
  },
  'ludhiana': {
    region: 'Ludhiana / Malwa Belt',
    state: 'Punjab',
    temperature: 32,
    condition: 'Warm & Dry',
    humidity: 52,
    rainChance: 15,
    windSpeed: 18,
    soilMoisture: 58,
    uvIndex: 8,
    forecast: [
      { day: 'Today', condition: 'Clear Sky', high: 33, low: 23, rainProb: 15 },
      { day: 'Tomorrow', condition: 'Sunny', high: 34, low: 24, rainProb: 10 },
      { day: 'Day 3', condition: 'Partly Cloudy', high: 32, low: 23, rainProb: 20 },
    ],
    farmingAdvisory: 'Moderate humidity with strong solar radiation. Favorable for early morning irrigation. Inspect corn and paddy borders for sucking pests (aphids and whiteflies). Plan land preparation for upcoming Rabi wheat sowing with seed treatment.',
    hindiAdvisory: 'धूप व मध्यम आर्द्रता। सुबह 6 से 8 बजे के बीच सिंचाई करें। आगामी रबी गेहूं की बुवाई हेतु खेत की जुताई व बीज उपचार की तैयारी करें।',
    diseaseRiskAlert: {
      active: false,
      level: 'Low',
      title: 'Mild Weather – Low Fungal Risk, Monitor Whiteflies',
      hindiTitle: 'अनुकूल मौसम – सफेद मक्खी व रस चूसक कीटों की निगरानी रखें',
      reason: 'Dry conditions suppress late blight, but warm winds can disperse whiteflies and thrips.',
      affectedCrops: ['Cotton', 'Maize', 'Vegetables'],
      preventiveSteps: [
        'Install yellow sticky traps (10/acre) to monitor sucking pests.',
        'Ensure uniform soil moisture to avoid moisture stress.',
      ],
    },
  },
  'varanasi': {
    region: 'Varanasi / Purvanchal',
    state: 'Uttar Pradesh',
    temperature: 30,
    condition: 'Thunderstorm Expected',
    humidity: 79,
    rainChance: 80,
    windSpeed: 22,
    soilMoisture: 76,
    uvIndex: 5,
    forecast: [
      { day: 'Today', condition: 'Thunderstorm', high: 30, low: 23, rainProb: 80 },
      { day: 'Tomorrow', condition: 'Rain Showers', high: 28, low: 22, rainProb: 65 },
      { day: 'Day 3', condition: 'Clearing Up', high: 31, low: 24, rainProb: 30 },
    ],
    farmingAdvisory: 'Heavy rain alert today. Postpone chemical sprayings and fertilizer application to prevent nutrient runoff into waterways. Clear blocked furrows in vegetable plots to prevent waterlogging and root asphyxiation.',
    hindiAdvisory: 'तेज बारिश की संभावना। आज किसी भी कीटनाशक या खाद का छिड़काव न करें ताकि दवा बह न जाए। खेतों से जल निकासी सुनिश्चित करें।',
    diseaseRiskAlert: {
      active: true,
      level: 'High',
      title: 'Waterlogging & Bacterial Leaf Spot Alert Post-Rain',
      hindiTitle: 'जलभराव व जीवाणु पत्ती धब्बा रोग की चेतावनी',
      reason: 'Raindrop splash spreads Xanthomonas bacteria rapidly across chillies and tomatoes.',
      affectedCrops: ['Tomato', 'Chilli / Pepper', 'Paddy'],
      preventiveSteps: [
        'Drench root zone with Trichoderma or Streptocycline post-rainstorm.',
        'Maintain clear drainage channels between beds.',
      ],
    },
  },
  'indore': {
    region: 'Indore / Malwa Plateau',
    state: 'Madhya Pradesh',
    temperature: 29,
    condition: 'Overcast & Drizzling',
    humidity: 76,
    rainChance: 55,
    windSpeed: 16,
    soilMoisture: 65,
    uvIndex: 6,
    forecast: [
      { day: 'Today', condition: 'Light Drizzle', high: 29, low: 21, rainProb: 55 },
      { day: 'Tomorrow', condition: 'Cloudy', high: 30, low: 22, rainProb: 40 },
      { day: 'Day 3', condition: 'Sun & Clouds', high: 31, low: 22, rainProb: 25 },
    ],
    farmingAdvisory: 'Intermittent overcast conditions favorable for Soybean and Maize rust monitoring. Check lower foliage for rust pustules. Apply balanced potash to enhance stem lodging resistance.',
    hindiAdvisory: 'बादल छाए रहने के कारण सोयाबीन और मक्का में गेरुआ (Rust) रोग की नियमित जांच करें। पोटाश का संतुलित प्रयोग करें।',
    diseaseRiskAlert: {
      active: true,
      level: 'Moderate',
      title: 'Moderate Rust & Anthracnose Alert',
      hindiTitle: 'मध्यम जोखिम: मक्का गेरुआ व एन्थ्रेक्नोज़ रोग अलर्ट',
      reason: 'Extended leaf wetness period of 6+ hours increases fungal spore germination.',
      affectedCrops: ['Soybean', 'Maize', 'Pulses'],
      preventiveSteps: [
        'Spray Hexaconazole 5% EC @ 2ml/L or Neem extract at first notice of orange pustules.',
      ],
    },
  },
};

export const INITIAL_CALENDAR_TASKS: CalendarTask[] = [
  {
    id: 'task-1',
    title: 'Prophylactic Trichoderma foliar spray (Tomato Field)',
    hindiTitle: 'टमाटर खेत में ट्राइकोडर्मा का सुरक्षात्मक छिड़काव',
    crop: 'Tomato',
    timeframe: 'Today • Morning (07:00 - 09:30 AM)',
    category: 'Spraying',
    completed: false,
    priority: 'High',
  },
  {
    id: 'task-2',
    title: 'Soil moisture check before drip line fertigation',
    hindiTitle: 'ड्रिप सिंचाई से पहले मिट्टी में नमी की जांच',
    crop: 'Potato',
    timeframe: 'Today • Afternoon (02:00 PM)',
    category: 'Irrigation',
    completed: true,
    priority: 'Medium',
  },
  {
    id: 'task-3',
    title: 'Potash & Zinc top-dressing (Maize Plot B)',
    hindiTitle: 'मक्का खेत में पोटाश व जिंक का छिड़काव',
    crop: 'Maize',
    timeframe: 'Tomorrow • Early Morning',
    category: 'Fertilizer',
    completed: false,
    priority: 'High',
  },
  {
    id: 'task-4',
    title: 'Inspect yellow sticky traps for whitefly threshold',
    hindiTitle: 'सफेद मक्खी की निगरानी हेतु चिपचिपे ट्रैप की जांच',
    crop: 'Chilli & Pepper',
    timeframe: 'In 2 Days',
    category: 'Spraying',
    completed: false,
    priority: 'Medium',
  },
  {
    id: 'task-5',
    title: 'Rabi Wheat land preparation & seed treatment',
    hindiTitle: 'रबी गेहूं हेतु खेत की तैयारी व कवकनाशी बीज उपचार',
    crop: 'Wheat',
    timeframe: 'Sowing Window: 12-16 Days Ahead',
    category: 'Sowing',
    completed: false,
    priority: 'High',
  },
];

export const DAILY_FARMING_TIPS: FarmingTip[] = [
  {
    id: 'tip-1',
    category: 'Irrigation',
    title: 'Avoid Late Evening Overhead Watering to Stop Spores',
    hindiTitle: 'शाम के समय फव्वारा सिंचाई से बचें ताकि फंगस न फैले',
    content: 'Fungal spores (Phytophthora, Alternaria) require 4 to 6 continuous hours of leaf moisture to penetrate plant cuticles. Switching to root-zone drip irrigation eliminates foliage wetness and slashes blight spread by over 75%.',
    hindiContent: 'पत्तियों पर लगातार 4-6 घंटे पानी रहने से फंगस सक्रिय हो जाती है। ड्रिप सिंचाई अपनाकर पत्तियों को सूखा रखें जिससे 75% रोग कम हो जाते हैं।',
    actionItem: 'Shift irrigation timing to early morning (05:30 - 08:30 AM) so rising sunlight dries remaining water droplets quickly.',
  },
  {
    id: 'tip-2',
    category: 'Fertilizer',
    title: 'Balance Nitrogen with Potassium to Toughen Leaf Walls',
    hindiTitle: 'यूरिया (नाइट्रोजन) की अधिकता रोकें, पोटाश से पत्तियां मजबूत करें',
    content: 'Excess chemical Nitrogen (Urea) produces rapid, succulent cell growth with fragile epidermal walls that fungal mycelia pierce easily. Applying Potassium (MOP or SOP) thickens cellular membranes and boosts plant natural immunity.',
    hindiContent: 'ज्यादा यूरिया डालने से पौधा कोमल हो जाता है और फफूंद आसानी से हमला करती है। पोटाश का इस्तेमाल पत्ती की बाहरी दीवार को मजबूत बनाता है।',
    actionItem: 'For crops exhibiting early fungal spots, halt foliar urea and apply water-soluble 00:00:50 (Potassium Sulfate) @ 5g/L.',
  },
  {
    id: 'tip-3',
    category: 'Pest Prevention',
    title: 'Deploy Yellow & Blue Sticky Traps for Early Pest Interception',
    hindiTitle: 'पीले और नीले चिपचिपे कार्ड लगाएं – रस चूसक कीटों पर नियंत्रण',
    content: 'Aphids, whiteflies, and thrips are prime vectors for devastating crop viruses like Tomato Leaf Curl and Chilli Veinal Mottle. Hanging 10-12 bright yellow sticky traps per acre catches migratory adults before they lay eggs.',
    hindiContent: 'सफेद मक्खी और थ्रिप्स वायरस फैलाते हैं। प्रति एकड़ 10-12 पीले ट्रैप लगाने से कीट प्रारंभिक अवस्था में ही चिपक कर खत्म हो जाते हैं।',
    actionItem: 'Install cards at 30cm above crop canopy height and clean/replace when surface covers > 60% with trapped insects.',
  },
  {
    id: 'tip-4',
    category: 'Soil Health',
    title: 'Incorporate Trichoderma-Enriched Farmyard Manure (FYM)',
    hindiTitle: 'गोबर खाद में ट्राइकोडर्मा मिलाकर जैविक सुरक्षा कवच बनाएं',
    content: 'Trichoderma viride is a beneficial bio-agent that actively parasitizes pathogenic root rot fungi (Rhizoctonia, Fusarium, Pythium). Mixing 2kg Trichoderma into 100kg moist FYM for 7 days multiplies colonies billion-fold.',
    hindiContent: '100 किलो नम गोबर खाद में 2 किलो ट्राइकोडर्मा मिलाकर 7 दिन ढक कर रखें। इससे लाभकारी कवक कई गुना बढ़ जाता है जो जमीन के रोगों को खत्म करता है।',
    actionItem: 'Broadcast the fermented mixture at planting or earthing-up to establish a living bio-shield around crop root zones.',
  },
];

export const FERTILIZER_RECOMMENDATIONS: Record<string, FertilizerRecommendation> = {
  'Early Blight': {
    conditionKey: 'Early Blight',
    cropOrDisease: 'Tomato / Potato Early Blight (Alternaria solani)',
    status: 'Infected',
    nitrogenAction: 'Reduce / Stop Urea immediately. Excess N produces thin leaves vulnerable to bullseye lesion expansion.',
    phosphorusAction: 'Maintain baseline single super phosphate (SSP) for root vigor.',
    potassiumAction: 'Boost Potassium (K) application by 25%. K fortifies epidermal cell walls against fungal appressoria penetration.',
    recommendedFormulation: 'Water-Soluble N-P-K 13:00:45 (Potassium Nitrate) @ 4g/L + Calcium Nitrate @ 2g/L foliar spray.',
    organicBooster: 'Trichoderma viride bio-fertilizer slurry mixed in compost + 2% Cold-Pressed Neem Seed Oil.',
    micronutrients: ['Zinc EDTA (0.5g/L)', 'Boron (0.2g/L) to strengthen vascular tissue'],
    timingWarning: 'Spray during clear morning hours after dew has evaporated; never during rain threat.',
  },
  'Late Blight': {
    conditionKey: 'Late Blight',
    cropOrDisease: 'Potato / Tomato Late Blight (Phytophthora infestans)',
    status: 'Infected',
    nitrogenAction: 'Strictly zero nitrogenous top-dressing until fungal sporulation is halted. Nitrogen fuels water-soaked lesions.',
    phosphorusAction: 'Apply phosphite-based nutrients (Potassium Phosphite) which trigger systemic acquired resistance (SAR).',
    potassiumAction: 'Apply high-grade Sulfate of Potash (SOP 00:00:50) to stabilize stomatal cell turgor.',
    recommendedFormulation: 'Potassium Phosphite @ 2.5ml/L + Mancozeb 75% WP contact fungicide @ 2.5g/L.',
    organicBooster: 'Bordeaux Mixture (1% Copper Sulphate + Slaked Lime) + Pseudomonas fluorescens liquid bio-agent.',
    micronutrients: ['Magnesium Sulphate (1g/L)', 'Silicon foliar spray (Potassium Silicate)'],
    timingWarning: 'Emergency application required within 24 hours of first water-soaked lesion detection.',
  },
  'Common Rust': {
    conditionKey: 'Common Rust',
    cropOrDisease: 'Corn / Maize Common Rust (Puccinia sorghi)',
    status: 'Infected',
    nitrogenAction: 'Curtail standard urea side-dressing. Excessive N accelerates rust pustule eruptive cycles.',
    phosphorusAction: 'Standard DAP (Di-Ammonium Phosphate) root application.',
    potassiumAction: 'Elevate Muriate of Potash (MOP) to improve stalk strength and stave off rust-induced lodging.',
    recommendedFormulation: 'Balanced foliar N-P-K 19:19:19 @ 5g/L supplemented with Hexaconazole or Mancozeb.',
    organicBooster: 'Sour Buttermilk (Chaas) spray @ 50ml/L or fermented cow urine (Gomutra) tonic.',
    micronutrients: ['Iron Chelate (Fe-EDTA)', 'Zinc Sulphate 0.5%'],
    timingWarning: 'Ensure thorough coverage of both upper and lower leaf surfaces where pustules erupt.',
  },
  'Bacterial Spot': {
    conditionKey: 'Bacterial Spot',
    cropOrDisease: 'Bell Pepper / Chilli Bacterial Spot (Xanthomonas campestris)',
    status: 'Infected',
    nitrogenAction: 'Completely avoid foliar urea sprays, which serve as bacterial multiplication broth.',
    phosphorusAction: 'Maintain balanced root-zone phosphorus for continuous new root emergence.',
    potassiumAction: 'Apply Potassium Silicate foliar solution to build rigid mechanical barriers against bacterial entry.',
    recommendedFormulation: 'Copper Hydroxide 77% WP @ 2g/L mixed with Streptocycline agricultural antibiotic @ 1g in 10L water.',
    organicBooster: 'Bacillus subtilis bio-fungicide drench + Panchagavya 3% foliar misting.',
    micronutrients: ['Borax (0.2%)', 'Calcium Chloride (1g/L) for fruit cuticle firmness'],
    timingWarning: 'Do not handle wet plants after spraying to avoid manual mechanical bacterial dispersion.',
  },
  'Healthy Leaf Tissue': {
    conditionKey: 'Healthy Leaf Tissue',
    cropOrDisease: 'Optimal Plant Growth & Preventive Maintenance',
    status: 'Healthy',
    nitrogenAction: 'Maintain recommended split doses (e.g. 1/3 at planting, 1/3 at vegetative flush, 1/3 at flowering).',
    phosphorusAction: 'Ensure adequate phosphorus for robust root architecture and flower induction.',
    potassiumAction: 'Standard maintenance potassium for drought tolerance, sugar translocation, and yield density.',
    recommendedFormulation: 'Balanced N-P-K 19:19:19 water-soluble fertigation @ 3g/L once every 14 days.',
    organicBooster: 'Well-rotted Vermicompost (250g per plant root zone) + Liquid Seaweed Extract (2ml/L).',
    micronutrients: ['Complete Chelated Micronutrient Combo (Zinc, Iron, Manganese, Boron, Copper, Molybdenum)'],
    timingWarning: 'Apply early morning or late afternoon for maximum root and stomatal absorption.',
  },
};

export const CROP_SHORTCUTS: CropShortcut[] = [
  {
    id: 'crop-shortcut-tomato',
    name: 'Tomato',
    hindiName: 'टमाटर',
    category: 'Solanaceous Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    optimalTemp: '20°C - 30°C',
    soilPH: '6.0 - 6.8',
    topDiseases: ['Early Blight', 'Late Blight', 'Yellow Leaf Curl'],
    quickRemedy: 'Neem Oil 2% + Copper Oxychloride spray',
    growthPeriod: '90 - 110 Days',
  },
  {
    id: 'crop-shortcut-potato',
    name: 'Potato',
    hindiName: 'आलू',
    category: 'Tuber Cash Crop',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    optimalTemp: '15°C - 22°C',
    soilPH: '5.2 - 6.4',
    topDiseases: ['Late Blight', 'Early Blight', 'Common Scab'],
    quickRemedy: 'Bordeaux Mixture (1%) + Ridomil MZ',
    growthPeriod: '80 - 100 Days',
  },
  {
    id: 'crop-shortcut-corn',
    name: 'Corn / Maize',
    hindiName: 'मक्का',
    category: 'Cereal / Fodder',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    optimalTemp: '21°C - 32°C',
    soilPH: '5.8 - 7.2',
    topDiseases: ['Common Rust', 'Northern Leaf Blight', 'Fall Armyworm'],
    quickRemedy: 'Hexaconazole 5% EC + Emamectin Benzoate',
    growthPeriod: '85 - 105 Days',
  },
  {
    id: 'crop-shortcut-wheat',
    name: 'Wheat',
    hindiName: 'गेहूं',
    category: 'Rabi Cereal Staple',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    optimalTemp: '15°C - 24°C',
    soilPH: '6.0 - 7.5',
    topDiseases: ['Yellow Stripe Rust', 'Loose Smut', 'Karnal Bunt'],
    quickRemedy: 'Propiconazole 25% EC (Tilt) @ 1ml/L',
    growthPeriod: '120 - 140 Days',
  },
  {
    id: 'crop-shortcut-pepper',
    name: 'Chilli & Pepper',
    hindiName: 'मिर्च / शिमला मिर्च',
    category: 'Spice / Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    optimalTemp: '20°C - 32°C',
    soilPH: '6.5 - 7.5',
    topDiseases: ['Bacterial Spot', 'Anthracnose Fruit Rot', 'Dieback'],
    quickRemedy: 'Streptocycline 1g/10L + Copper Hydroxide',
    growthPeriod: '120 - 150 Days',
  },
  {
    id: 'crop-shortcut-cotton',
    name: 'Cotton',
    hindiName: 'कपास',
    category: 'Fiber Commercial Crop',
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
    optimalTemp: '22°C - 34°C',
    soilPH: '6.0 - 8.0',
    topDiseases: ['Bacterial Blight', 'Grey Mildew', 'Bollworm'],
    quickRemedy: 'Copper Oxychloride + Spinetoram',
    growthPeriod: '150 - 180 Days',
  },
];

// Initial default scan records for immediate rich dashboard viewing
export const DEFAULT_SCAN_HISTORY: ScanHistoryRecord[] = [
  {
    id: 'scan-init-1',
    cropName: 'Tomato (Solanum lycopersicum)',
    diseaseName: 'Early Blight',
    scientificName: 'Alternaria solani',
    isHealthy: false,
    confidence: 97.4,
    severity: 'Moderate',
    detectedAt: 'Today, 08:35 AM',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80',
    symptoms: [
      'Concentric bullseye rings on lower leaves',
      'Chlorotic yellow halos surrounding necrotic leaf spots',
    ],
    treatment: {
      organic: ['Foliar spray of 2% cold-pressed Neem Seed Oil', 'Apply Trichoderma viride bio-fungicide slurry'],
      chemical: ['Mancozeb 75% WP @ 2.5g/L water', 'Chlorothalonil @ 3g/L spray'],
      prevention: ['Drip irrigation instead of overhead sprinklers', 'Ensure 60cm plant spacing'],
    },
    cropHealthScore: 62,
  },
  {
    id: 'scan-init-2',
    cropName: 'Potato (Solanum tuberosum)',
    diseaseName: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    isHealthy: false,
    confidence: 98.8,
    severity: 'Severe',
    detectedAt: 'Yesterday, 04:15 PM',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
    symptoms: [
      'Dark water-soaked irregular lesions on leaf margins',
      'White fungal downy mildew on leaf undersides',
    ],
    treatment: {
      organic: ['Immediate Bordeaux Mixture (1%) application', 'Potassium bicarbonate foliar spray @ 5g/L'],
      chemical: ['Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L', 'Cymoxanil + Mancozeb @ 2g/L curative spray'],
      prevention: ['Plant certified disease-free seed tubers', 'High earthing up of ridges'],
    },
    cropHealthScore: 48,
  },
  {
    id: 'scan-init-3',
    cropName: 'Corn / Maize (Zea mays)',
    diseaseName: 'Common Rust',
    scientificName: 'Puccinia sorghi',
    isHealthy: false,
    confidence: 96.2,
    severity: 'Mild',
    detectedAt: '14 Sep, 11:20 AM',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80',
    symptoms: [
      'Golden brown to cinnamon powdery pustules on both leaf surfaces',
      'Partial chlorosis on upper photosynthetic foliage',
    ],
    treatment: {
      organic: ['Sour buttermilk / Chaas spray @ 50ml/L', 'Fermented bio-potassium liquid tonic'],
      chemical: ['Hexaconazole 5% EC @ 2ml/L', 'Azoxystrobin 23% SC @ 1ml/L'],
      prevention: ['Plant rust-tolerant hybrid cultivars', 'Maintain balanced N-P-K without excess urea'],
    },
    cropHealthScore: 74,
  },
  {
    id: 'scan-init-4',
    cropName: 'Tomato (Solanum lycopersicum)',
    diseaseName: 'Healthy Leaf Tissue',
    scientificName: 'Non-Pathogenic Specimen',
    isHealthy: true,
    confidence: 99.3,
    severity: 'Healthy',
    detectedAt: '13 Sep, 02:40 PM',
    imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=400&q=80',
    symptoms: [
      'Intact epidermal cell layer with deep chlorophyll pigment',
      'Zero pathogen mycelium or necrotic spotting',
    ],
    treatment: {
      organic: ['Maintain monthly vermicompost top-dressing', 'Prophylactic Panchagavya foliar tonic'],
      chemical: ['No fungicides required; maintain 19:19:19 fertigation'],
      prevention: ['Bi-weekly visual field audits', 'Keep marigold border trap crops'],
    },
    cropHealthScore: 98,
  },
];

// Helper functions for scan history persistence
export function getSavedScanHistory(): ScanHistoryRecord[] {
  try {
    const raw = localStorage.getItem('farmerdetect_scan_history');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading scan history from localStorage:', err);
  }
  return DEFAULT_SCAN_HISTORY;
}

export function saveNewScanToHistory(result: PredictionResult): ScanHistoryRecord[] {
  const current = getSavedScanHistory();
  const newRecord: ScanHistoryRecord = {
    id: result.id || 'scan-' + Date.now(),
    cropName: result.cropName,
    diseaseName: result.diseaseName,
    scientificName: result.scientificName,
    isHealthy: result.isHealthy,
    confidence: result.confidence,
    severity: result.severity,
    detectedAt: 'Just Now',
    imageUrl: result.imageUrl || 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80',
    symptoms: result.symptoms || [],
    treatment: result.treatment || { organic: [], chemical: [], prevention: [] },
    cropHealthScore: result.cropHealthScore || (result.isHealthy ? 95 : 60),
  };

  // Prepend new record, cap at 15 items
  const updated = [newRecord, ...current.filter((r) => r.id !== newRecord.id)].slice(0, 15);
  try {
    localStorage.setItem('farmerdetect_scan_history', JSON.stringify(updated));
  } catch (err) {
    console.warn('Error saving scan history to localStorage:', err);
  }
  return updated;
}
