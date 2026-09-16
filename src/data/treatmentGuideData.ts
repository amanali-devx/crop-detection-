export interface OrganicSolutionItem {
  id: string;
  nameEn: string;
  nameHi: string;
  badge: string;
  preparationEn: string;
  preparationHi: string;
  dosagePerLiter: string;
  dosageUnitPerLiter: number; // e.g. 5 for 5ml or 5g
  unitType: 'ml' | 'g';
  timingEn: string;
  timingHi: string;
  benefitsEn: string;
  benefitsHi: string;
  costRating: 'Free / Kitchen' | 'Very Low Cost' | 'Low Cost';
}

export interface ChemicalSolutionItem {
  id: string;
  chemicalName: string;
  tradeNames: string;
  formulation: string;
  dosagePerLiter: string;
  dosageUnitPerLiter: number;
  unitType: 'ml' | 'g';
  instructionEn: string;
  instructionHi: string;
  preHarvestIntervalDays: number;
  toxicityClass: 'Slightly Toxic (Blue)' | 'Moderately Toxic (Blue)' | 'Bio-Chemical';
  safetyPrecautionsEn: string;
  safetyPrecautionsHi: string;
}

export interface DiseaseTreatmentGuide {
  diseaseKey: string;
  cropName: string;
  diseaseName: string;
  diseaseNameHi: string;
  severityThresholdForPesticide: 'Moderate' | 'Severe'; // at or above this severity, chemical is suggested
  summaryEn: string;
  summaryHi: string;
  timelinePlan: {
    day1En: string;
    day1Hi: string;
    day3En: string;
    day3Hi: string;
    day7En: string;
    day7Hi: string;
  };
  organicSolutions: OrganicSolutionItem[];
  chemicalSolutions: ChemicalSolutionItem[];
  preventionRulesEn: string[];
  preventionRulesHi: string[];
}

export const DISEASE_TREATMENT_DATABASE: Record<string, DiseaseTreatmentGuide> = {
  'early blight': {
    diseaseKey: 'early blight',
    cropName: 'Tomato / Potato',
    diseaseName: 'Early Blight (Alternaria solani)',
    diseaseNameHi: 'अगेती झुलसा रोग (अल्टरनेरिया सोलेनी)',
    severityThresholdForPesticide: 'Severe',
    summaryEn: 'Early blight causes dark bullseye rings. Prioritize 100% organic bio-fungicides and neem oil. Chemical fungicides are ONLY needed if infection spreads to over 30% of foliage (Severe stage).',
    summaryHi: 'अगेती झुलसा में पत्तियों पर गोल छल्लेनुमा धब्बे बनते हैं। 100% जैविक नीम तेल व बायो-फंगीसाइड को पहली प्राथमिकता दें। केवल गंभीर अवस्था (30% से अधिक नुकसान) में ही रासायनिक दवा का प्रयोग करें।',
    timelinePlan: {
      day1En: 'Pluck lower infected leaves, safely bury them away from field. Spray 2% Cold-Pressed Neem Oil in late afternoon.',
      day1Hi: 'रोगग्रस्त निचली पत्तियों को तोड़कर खेत से दूर मिट्टी में दबाएं। शाम के समय 2% कोल्ड-प्रेस्ड नीम तेल का छिड़काव करें।',
      day3En: 'Apply Trichoderma viride bio-fungicide or fermented buttermilk solution across canopy.',
      day3Hi: 'ट्राइकोडर्मा विरिडी बायो-कवकनाशी या तांबे के बर्तन में रखी खट्टी छाछ के घोल का पत्तियों पर छिड़काव करें।',
      day7En: 'Assess leaf recovery. If new leaves are green, repeat organic spray; only apply chemical if spread is rampant.',
      day7Hi: 'फसल का निरीक्षण करें। यदि नई पत्तियां हरी हैं तो जैविक स्प्रे दोहराएं; अत्यधिक फैलाव होने पर ही रासायनिक स्प्रे करें।'
    },
    organicSolutions: [
      {
        id: 'neem-oil',
        nameEn: 'Cold-Pressed Neem Oil (Azadirachtin 1500-3000 PPM)',
        nameHi: 'कोल्ड-प्रेस्ड नीम तेल (1500-3000 PPM) + साबुन घोल',
        badge: '100% Organic • Best Contact Barrier',
        preparationEn: 'Mix 5ml Neem Oil + 2ml liquid dish soap or khadi soap per 1 litre of warm water until milky white emulsion forms.',
        preparationHi: '1 लीटर गुनगुने पानी में 5ml नीम तेल और 2ml लिक्विड साबुन/शैम्पू अच्छी तरह मिलाएं जब तक दूधिया घोल न बन जाए।',
        dosagePerLiter: '5 ml / Litre',
        dosageUnitPerLiter: 5,
        unitType: 'ml',
        timingEn: 'Spray in the late afternoon (after 4 PM) on both upper and lower leaf surfaces. Repeat every 6 days.',
        timingHi: 'शाम 4 बजे के बाद पत्ती के दोनों तरफ (ऊपर व नीचे) अच्छी तरह छिड़कें। हर 6 दिन में दोहराएं।',
        benefitsEn: 'Stops fungal spore growth, safe for honeybees and earthworms, leaves zero chemical residue on fruits.',
        benefitsHi: 'फंगस के बीजाणुओं को नष्ट करता है, मधुमक्खियों व केंचुओं के लिए सुरक्षित, फल पर कोई जहरीला असर नहीं।',
        costRating: 'Very Low Cost'
      },
      {
        id: 'trichoderma',
        nameEn: 'Trichoderma viride / harzianum Bio-Fungicide',
        nameHi: 'ट्राइकोडर्मा विरिडी / हरजियानम जैविक फफूंदनाशक',
        badge: 'Biological Parasitic Fungus • ICAR Approved',
        preparationEn: 'Mix 5g Trichoderma powder with 1L water and 5g jaggery (gur) slurry. Keep for 2 hours before spraying.',
        preparationHi: '1 लीटर पानी में 5 ग्राम ट्राइकोडर्मा पाउडर और 5 ग्राम गुड़ का घोल मिलाकर 2 घंटे रखें, फिर छानकर छिड़कें।',
        dosagePerLiter: '5 g / Litre',
        dosageUnitPerLiter: 5,
        unitType: 'g',
        timingEn: 'Apply in the early morning or cloudy weather. Can also be drenched in root zone with vermicompost.',
        timingHi: 'सुबह के समय या बादल वाले मौसम में स्प्रे करें। इसे जड़ के पास खाद में मिलाकर भी दे सकते हैं।',
        benefitsEn: 'Beneficial living fungus feeds on harmful Alternaria pathogens, boosting long-term crop immunity.',
        benefitsHi: 'यह मित्र फफूंद हानिकारक फंगस को खाकर खत्म करती है और पौधे में प्राकृतिक रोग प्रतिरोधक क्षमता बढ़ाती है।',
        costRating: 'Low Cost'
      },
      {
        id: 'buttermilk',
        nameEn: 'Fermented Sour Buttermilk / Curd Spray (खट्टी छाछ)',
        nameHi: 'तांबे के पात्र में फरमेंटेड खट्टी छाछ का अर्क',
        badge: 'Home / Farm Made • Zero Cost',
        preparationEn: 'Ferment 1 litre sour buttermilk in a copper pot/vessel for 5 days. Dilute with 10 litres of water (1:10 ratio) and strain well.',
        preparationHi: '1 लीटर खट्टी छाछ को 5 दिनों तक तांबे के बर्तन में रखें। फिर इसे 10 लीटर ताजे पानी में मिलाकर कपड़े से छान लें।',
        dosagePerLiter: '100 ml / Litre',
        dosageUnitPerLiter: 100,
        unitType: 'ml',
        timingEn: 'Spray every 7-10 days. Natural copper lactate acts as an organic protective bactericide and fungicide.',
        timingHi: 'हर 7-10 दिन में छिड़कें। तांबे और लैक्टिक एसिड का प्राकृतिक मिश्रण फंगस को तुरंत रोकता है।',
        benefitsEn: 'Virtually free, supplies natural calcium and micro-nutrients to crop foliage while suppressing fungus.',
        benefitsHi: 'बिल्कुल मुफ्त घरेलू उपाय, पत्तियों को कैल्शियम व सूक्ष्म पोषक तत्व देता है और झुलसा रोकता है।',
        costRating: 'Free / Kitchen'
      },
      {
        id: 'wood-ash',
        nameEn: 'Sieved Wood Ash & Turmeric Dusting',
        nameHi: 'लकड़ी की छनी हुई राख + हल्दी का छिड़काव',
        badge: 'Traditional Protective Desiccant',
        preparationEn: 'Mix 90% fine wood ash with 10% pure turmeric powder. Dust lightly over damp morning foliage.',
        preparationHi: 'बारीक छनी लकड़ी की राख में 10% हल्दी पाउडर मिलाएं। सुबह ओस के समय पत्तियों पर हल्का भुरकाव करें।',
        dosagePerLiter: 'Dusting (250g / 10 plants)',
        dosageUnitPerLiter: 25,
        unitType: 'g',
        timingEn: 'Apply early morning when dew is on leaves so powder adheres evenly.',
        timingHi: 'सुबह तड़के जब ओस जमी हो तब छिड़कें ताकि राख चिपक जाए और पत्ती सूखी रहे।',
        benefitsEn: 'Absorbs excess moisture that fungi need to germinate; adds potassium and silica to leaf epidermis.',
        benefitsHi: 'नमी सोखकर फफूंद के अंकुरण को रोकती है तथा पत्तियों को पोटाश व सिलिका प्रदान करती है।',
        costRating: 'Free / Kitchen'
      }
    ],
    chemicalSolutions: [
      {
        id: 'mancozeb',
        chemicalName: 'Mancozeb 75% WP (Dithane M-45)',
        tradeNames: 'Dithane M-45, Indofil M-45, UPL Saaf',
        formulation: 'Wettable Powder (WP)',
        dosagePerLiter: '2.5 g / Litre (37.5g per 15L Pump)',
        dosageUnitPerLiter: 2.5,
        unitType: 'g',
        instructionEn: 'Dissolve thoroughly in water. Spray uniformly across entire foliage. Do not spray during windy or peak sunny hours.',
        instructionHi: 'पानी में अच्छी तरह घोलें। पूरी फसल पर एकसमान छिड़कें। तेज धूप या तेज हवा में छिड़काव न करें।',
        preHarvestIntervalDays: 7,
        toxicityClass: 'Slightly Toxic (Blue)',
        safetyPrecautionsEn: 'Wear protective mask & rubber gloves. Keep children and livestock away from field for 24 hours.',
        safetyPrecautionsHi: 'छिड़काव करते समय मुंह पर मास्क और हाथों में दस्ताने पहनें। 24 घंटे तक मवेशियों को खेत से दूर रखें।'
      },
      {
        id: 'copper-oxychloride',
        chemicalName: 'Copper Oxychloride 50% WP (Blitox 50)',
        tradeNames: 'Blitox 50, Blue Copper, Fytolan',
        formulation: 'Wettable Powder (WP)',
        dosagePerLiter: '3.0 g / Litre (45g per 15L Pump)',
        dosageUnitPerLiter: 3.0,
        unitType: 'g',
        instructionEn: 'Broad-spectrum contact fungicide and bactericide. Forms a chemical shield on leaf surface.',
        instructionHi: 'संपर्क कवकनाशी व जीवाणुनाशक। पत्ती की सतह पर सुरक्षात्मक कवच बनाता है।',
        preHarvestIntervalDays: 10,
        toxicityClass: 'Moderately Toxic (Blue)',
        safetyPrecautionsEn: 'Do not mix with alkaline substances or lime sulfur. Wash spray equipment thoroughly after use.',
        safetyPrecautionsHi: 'इसे किसी क्षारीय दवा के साथ न मिलाएं। छिड़काव के बाद पंप को साफ पानी से अच्छी तरह धोएं।'
      }
    ],
    preventionRulesEn: [
      'Avoid overhead sprinkler irrigation; always use drip irrigation to keep leaf canopy dry.',
      'Maintain 60cm distance between rows for abundant air circulation and sunlight penetration.',
      'Practice 3-year crop rotation without growing tomato, potato, eggplant, or chilli in the same plot.'
    ],
    preventionRulesHi: [
      'फव्वारा सिंचाई से बचें; हमेशा ड्रिप सिंचाई करें ताकि पत्तियां गीली न रहें।',
      'पंक्तियों के बीच 60 सेमी की दूरी रखें ताकि धूप और हवा का संचार बना रहे।',
      'एक ही खेत में लगातार आलू, टमाटर, बैंगन न लगाएं; 3 साल का फसल चक्र अपनाएं।'
    ]
  },

  'late blight': {
    diseaseKey: 'late blight',
    cropName: 'Potato / Tomato',
    diseaseName: 'Late Blight (Phytophthora infestans)',
    diseaseNameHi: 'पछेती झुलसा रोग (फाइटोपथोरा इन्फेस्टन्स)',
    severityThresholdForPesticide: 'Severe',
    summaryEn: 'Late blight spreads aggressively in high humidity (>85%) and cool temperatures (12-22°C). Organic Bordeaux mixture or bio-fungicide is primary; if infection collapses leaf margins rapidly, emergency systemic fungicide is advised.',
    summaryHi: 'पछेती झुलसा अत्यधिक नमी और ठंड में तेजी से फैलता है। जैविक बोर्डो मिश्रण व बायो-फंगीसाइड पहली सुरक्षा है; यदि तेजी से पत्तियां काली पड़ रही हों, तभी आपातकालीन रासायनिक कवकनाशी का सहारा लें।',
    timelinePlan: {
      day1En: 'Immediately remove and burn or deep bury severely rotting vines. Apply Bordeaux mixture or Trichoderma bio-fungicide.',
      day1Hi: 'काली पड़ चुकी सड़ी पत्तियों को तुरंत काटकर जमीन में गहरा दबाएं। बोर्डो मिश्रण या ट्राइकोडर्मा का स्प्रे करें।',
      day3En: 'Check underside of leaves for white cottony growth. If spreading continues uncontrollably, apply recommended chemical dose.',
      day3Hi: 'पत्ती के नीचे सफेद फफूंद की जांच करें। यदि फैलाव तेज हो रहा हो, तभी अनुशंसित रासायनिक कवकनाशी लगाएं।',
      day7En: 'Ensure ridges are earthed up with soil to protect underground tubers from falling spores.',
      day7Hi: 'आलू की मेड़ों पर मिट्टी चढ़ाएं ताकि जमीन के नीचे के कंद संक्रमित पानी से सुरक्षित रहें।'
    },
    organicSolutions: [
      {
        id: 'bordeaux-mixture',
        nameEn: '1% Bordeaux Mixture (Copper Sulphate + Slaked Lime)',
        nameHi: '1% बोर्डो मिश्रण (नीला थोथा + बुझा हुआ चूना)',
        badge: 'Time-Tested Organic Fungicide • Zero Resistance',
        preparationEn: 'Dissolve 100g Copper Sulphate in 5L water and 100g Slaked Lime in 5L water in plastic containers. Mix both together to prepare 10L 1% solution.',
        preparationHi: '100 ग्राम नीला थोथा (Copper Sulphate) और 100 ग्राम बुझा चूना अलग-अलग प्लास्टिक बाल्टी में 5-5L पानी में घोलें। दोनों को मिलाकर 10L घोल तैयार करें।',
        dosagePerLiter: '100 ml / Litre (Ready Mixture)',
        dosageUnitPerLiter: 100,
        unitType: 'ml',
        timingEn: 'Spray immediately upon preparation when weather is humid. Never prepare in metal or iron buckets.',
        timingHi: 'घोल बनते ही तुरंत छिड़कें। इसे कभी भी लोहे या धातु के बर्तन में न बनाएं।',
        benefitsEn: 'Powerful multi-site protective shield that prevents late blight spores from penetrating leaf cells.',
        benefitsHi: 'पत्ती पर मजबूत सुरक्षा कवच बनाता है, जिससे झुलसा के बीजाणु पत्ती के अंदर नहीं घुस पाते।',
        costRating: 'Low Cost'
      },
      {
        id: 'potassium-bicarbonate',
        nameEn: 'Potassium Bicarbonate + Neem Foliar Spray',
        nameHi: 'पोटेशियम बाइकार्बोनेट + नीम तेल स्प्रे',
        badge: 'Spore Neutralizer • Organic Certified',
        preparationEn: 'Mix 4g Potassium Bicarbonate + 3ml Neem oil in 1 litre water. Shake thoroughly.',
        preparationHi: '1 लीटर पानी में 4 ग्राम पोटेशियम बाइकार्बोनेट और 3ml नीम तेल मिलाकर अच्छी तरह घोलें।',
        dosagePerLiter: '4 g / Litre',
        dosageUnitPerLiter: 4,
        unitType: 'g',
        timingEn: 'Spray in afternoon hours across leaf surfaces. Repeat after rain showers.',
        timingHi: 'दोपहर बाद पत्तियों के ऊपर व नीचे छिड़कें। बारिश के बाद दोबारा छिड़कें।',
        benefitsEn: 'Alters leaf surface pH to alkaline, halting Phytophthora mycelium growth without toxicity.',
        benefitsHi: 'पत्ती की सतह का पीएच बदलकर फंगस को सुखा देता है, फल व मिट्टी के लिए पूरी तरह सुरक्षित।',
        costRating: 'Low Cost'
      },
      {
        id: 'cow-urine-decoction',
        nameEn: 'Gau-Mutra (Cow Urine) + Neem Leaf Bio-Extract (जीवामृत अर्क)',
        nameHi: 'देसी गोमूत्र + नीम की पत्ती का जैविक काढ़ा',
        badge: 'Traditional Vedic Agronomy',
        preparationEn: 'Boil 2kg crushed neem leaves in 5L indigenous cow urine for 20 minutes. Dilute 1L extract in 10L water before spraying.',
        preparationHi: '2 किलो कुचली हुई नीम पत्तियों को 5 लीटर गोमूत्र में 20 मिनट उबालें। ठंडा होने पर 1 लीटर काढ़ा 10 लीटर पानी में मिलाकर छिड़कें।',
        dosagePerLiter: '100 ml / Litre',
        dosageUnitPerLiter: 100,
        unitType: 'ml',
        timingEn: 'Foliar spray every 5-7 days during cloudy high-humidity periods.',
        timingHi: 'बादल छाए रहने या अधिक नमी के दिनों में हर 5-7 दिन पर पत्तियों पर छिड़काव करें।',
        benefitsEn: 'Boosts plant immunity, provides bio-nitrogen, and repels fungal mycelia effectively.',
        benefitsHi: 'फसल की रोग प्रतिरोधक क्षमता बढ़ाता है, नाइट्रोजन देता है और फफूंद को फैलने से रोकता है।',
        costRating: 'Free / Kitchen'
      }
    ],
    chemicalSolutions: [
      {
        id: 'ridomil-mz',
        chemicalName: 'Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ)',
        tradeNames: 'Ridomil MZ, Krilaxyl, Master, Matco',
        formulation: 'Systemic + Contact Wettable Powder',
        dosagePerLiter: '2.5 g / Litre (37.5g per 15L Pump)',
        dosageUnitPerLiter: 2.5,
        unitType: 'g',
        instructionEn: 'Emergency curative systemic fungicide. Translaminar action reaches deep inside infested plant tissues.',
        instructionHi: 'आपातकालीन प्रणालीगत (Systemic) कवकनाशी। पत्ती के अंदर तक जाकर फंगस को नष्ट करता है।',
        preHarvestIntervalDays: 14,
        toxicityClass: 'Moderately Toxic (Blue)',
        safetyPrecautionsEn: 'Do not apply more than twice per season to prevent pathogen resistance. Wear respirator mask.',
        safetyPrecautionsHi: 'पूरे सीजन में 2 बार से अधिक न छिड़कें ताकि फंगस में प्रतिरोध न बने। मास्क जरूर पहनें।'
      },
      {
        id: 'cymoxanil-mancozeb',
        chemicalName: 'Cymoxanil 8% + Mancozeb 64% WP (Curzate M8)',
        tradeNames: 'Curzate M8, Sectin, Melody Duo',
        formulation: 'Curative WP',
        dosagePerLiter: '2.0 g / Litre (30g per 15L Pump)',
        dosageUnitPerLiter: 2.0,
        unitType: 'g',
        instructionEn: 'Kick-back action stops disease progression even 48-72 hours after initial infection.',
        instructionHi: 'किक-बैक क्रिया संक्रमण शुरू होने के 48-72 घंटे बाद भी रोग को रोक देती है।',
        preHarvestIntervalDays: 10,
        toxicityClass: 'Moderately Toxic (Blue)',
        safetyPrecautionsEn: 'Harvest only after minimum 10-day safety waiting period. Keep livestock away.',
        safetyPrecautionsHi: 'दवा छिड़कने के कम से कम 10 दिन बाद ही आलू या टमाटर की तुड़ाई करें।'
      }
    ],
    preventionRulesEn: [
      'Plant certified disease-free seed tubers (e.g., Kufri Girdhari, Kufri Khyati).',
      'Earthing up: Build high soil ridges around plant bases so spores wash into furrows, not tubers.',
      'Track weather alerts: When temperature is 12-22°C and humidity >85% for 48 hours, begin protective bio-spray immediately.'
    ],
    preventionRulesHi: [
      'हमेशा प्रमाणित रोगमुक्त बीज का उपयोग करें (जैसे कुफरी गिरधारी, कुफरी ख्याति)।',
      'पौधों पर अच्छी मिट्टी चढ़ाएं ताकि बारिश का पानी कवक के बीजाणुओं को आलू के कंद तक न पहुंचा सके।',
      'मौसम पर नजर रखें: जब तापमान 12-22°C और नमी 85% से अधिक हो, तो तुरंत सुरक्षात्मक जैविक छिड़काव करें।'
    ]
  },

  'common rust': {
    diseaseKey: 'common rust',
    cropName: 'Corn / Maize',
    diseaseName: 'Common Rust (Puccinia sorghi)',
    diseaseNameHi: 'मक्का का रतुआ / गेरुआ रोग (पक्सीनिया सोरघाई)',
    severityThresholdForPesticide: 'Severe',
    summaryEn: 'Golden rust pustules rupture maize leaves. Organic sulfur and bio-protectants work excellently at early and moderate levels. Only apply chemical triazole fungicides if >6 pustules per leaf emerge before silking stage.',
    summaryHi: 'मक्के की पत्तियों पर भूरे-लाल दानेदार फफोले बनते हैं। सल्फर व जैविक छिड़काव से यह आसानी से नियंत्रित होता है। केवल गंभीर स्थिति में (भुट्टे निकलने से पहले भारी प्रकोप) रासायनिक दवा का प्रयोग करें।',
    timelinePlan: {
      day1En: 'Remove heavily rusted lower leaves. Spray Wettable Sulfur (80% WP) or Neem oil at 5ml/L.',
      day1Hi: 'रोगग्रस्त निचली पत्तियों को हटाएं। घुलनशील सल्फर (80% WP) या 5ml/L नीम तेल का छिड़काव करें।',
      day3En: 'Apply Ampelomyces quisqualis or Bacillus subtilis bio-spray to suppress urediniospore release.',
      day3Hi: 'मित्र कवक बायो-स्प्रे का छिड़काव करें ताकि रतुआ के बीजाणु आगे न फैल सकें।',
      day7En: 'Check ear and cob leaf emergence. Maintain adequate potassium fertilization to thicken cell walls.',
      day7Hi: 'भुट्टे की पत्तियों की जांच करें। पोटाश खाद दें ताकि पौधे की पत्ती की कोशिका भित्ति मजबूत रहे।'
    },
    organicSolutions: [
      {
        id: 'wettable-sulfur',
        nameEn: 'Wettable Sulfur (80% WDG / WP)',
        nameHi: 'घुलनशील गंधक / सल्फर (80% WDG)',
        badge: 'Organic Mineral • Multi-Site Action',
        preparationEn: 'Dissolve 3g Wettable Sulfur powder per 1 litre of clean water. Agitate continuously.',
        preparationHi: '1 लीटर पानी में 3 ग्राम घुलनशील गंधक (Sulfur) पाउडर अच्छी तरह मिलाएं।',
        dosagePerLiter: '3 g / Litre (45g per 15L Pump)',
        dosageUnitPerLiter: 3,
        unitType: 'g',
        timingEn: 'Spray in early morning or cool evening. Do not apply when ambient temperature exceeds 32°C.',
        timingHi: 'सुबह या शाम के ठंडे समय छिड़कें। 32°C से अधिक तेज धूप में इसका छिड़काव न करें।',
        benefitsEn: 'Inhibits fungal respiration and provides essential sulfur nutrient for grain filling.',
        benefitsHi: 'फंगस को सांस लेने से रोकता है और मक्का में दाना भरने के लिए जरूरी सल्फर पोषण भी देता है।',
        costRating: 'Very Low Cost'
      },
      {
        id: 'neem-garlic',
        nameEn: 'Neem Oil + Garlic-Chilli Extract (लहसुन-मिर्च काढ़ा)',
        nameHi: 'नीम तेल + लहसुन-तीखी मिर्च का जैविक अर्क',
        badge: 'Repellent & Antifungal Bio-Cocktail',
        preparationEn: 'Crush 250g garlic + 250g green chillies, boil in 2L water. Dilute 50ml extract + 5ml Neem oil per 1L water.',
        preparationHi: '250 ग्राम लहसुन और 250 ग्राम हरी मिर्च पीसकर 2L पानी में उबालें। 1L पानी में 50ml अर्क और 5ml नीम तेल मिलाकर छिड़कें।',
        dosagePerLiter: '50 ml / Litre',
        dosageUnitPerLiter: 50,
        unitType: 'ml',
        timingEn: 'Spray every 7 days across maize canopy.',
        timingHi: 'हर 7 दिन में मक्का के पौधों पर अच्छी तरह छिड़कें।',
        benefitsEn: 'Allicin in garlic breaks down rust pustules while chilli capsaicin deters armyworm caterpillars.',
        benefitsHi: 'लहसुन का एलिसिन फंगस को मारता है और मिर्च कीटों व सुंडी को भी फसल से दूर रखती है।',
        costRating: 'Free / Kitchen'
      }
    ],
    chemicalSolutions: [
      {
        id: 'propiconazole',
        chemicalName: 'Propiconazole 25% EC (Tilt 25 EC)',
        tradeNames: 'Tilt, Bumper, Radar',
        formulation: 'Emulsifiable Concentrate (EC)',
        dosagePerLiter: '1.0 ml / Litre (15ml per 15L Pump)',
        dosageUnitPerLiter: 1.0,
        unitType: 'ml',
        instructionEn: 'Emergency triazole fungicide for corn rust. Inhibits ergosterol synthesis in fungi within 6 hours.',
        instructionHi: 'मक्के के रतुआ रोग के लिए आपातकालीन दवा। 6 घंटे के अंदर फंगस के विकास को पूरी तरह रोकती है।',
        preHarvestIntervalDays: 21,
        toxicityClass: 'Moderately Toxic (Blue)',
        safetyPrecautionsEn: 'A single calibrated spray before silking stage is usually sufficient. Do not feed sprayed forage to dairy cattle for 14 days.',
        safetyPrecautionsHi: 'भुट्टा बनने से पहले एक बार का सही छिड़काव ही काफी है। छिड़के गए चारे को 14 दिन तक पशुओं को न खिलाएं।'
      }
    ],
    preventionRulesEn: [
      'Plant rust-resistant certified hybrid maize varieties suited for your agro-climatic region.',
      'Avoid staggered planting in adjoining plots to prevent continuous green bridge spore drift.',
      'Eradicate Oxalis weeds around field borders which serve as alternative winter hosts for rust spores.'
    ],
    preventionRulesHi: [
      'रोग प्रतिरोधी उन्नत मक्का किस्मों की ही बुवाई करें।',
      'पास के खेतों में अलग-अलग समय पर बुवाई से बचें ताकि हवा से फंगस न फैले।',
      'खेत की मेड़ों से खट्टी-मीठी घास (Oxalis) को हटा दें जिस पर यह फंगस जिंदा रहती है।'
    ]
  },

  'apple scab': {
    diseaseKey: 'apple scab',
    cropName: 'Apple',
    diseaseName: 'Apple Scab (Venturia inaequalis)',
    diseaseNameHi: 'सेब का स्कैब / दाद रोग (वेंटुरिया इनेक्वालिस)',
    severityThresholdForPesticide: 'Severe',
    summaryEn: 'Scab produces olive-black velvety spots on apple leaves and corky cracks on fruit. Bio-fungicide and lime sulfur protect foliage organically; chemical intervention is reserved for severe continuous rainy infection periods.',
    summaryHi: 'सेब की पत्तियों व फलों पर मखमली काले धब्बे पड़ते हैं। जैविक लाइम-सल्फर व बायो-फंगीसाइड सबसे सुरक्षित हैं; केवल लगातार बारिश और अत्यधिक संक्रमण में ही केमिकल का इस्तेमाल करें।',
    timelinePlan: {
      day1En: 'Collect and shred or compost fallen infected leaves. Spray organic liquid lime sulfur or Bacillus subtilis.',
      day1Hi: 'बगीचे में नीचे गिरी संक्रमित पत्तियों को इकट्ठा कर नष्ट करें। जैविक लाइम-सल्फर या बैसिलस का स्प्रे करें।',
      day3En: 'Monitor new shoot tips and fruitlets under magnifying glass for olive feathery lesions.',
      day3Hi: 'नई कोपलों व छोटे फलों का निरीक्षण करें कि कहीं नए धब्बे तो नहीं बन रहे।',
      day7En: 'Apply bio-fungicide protective coat prior to anticipated rain forecasts.',
      day7Hi: 'बारिश के अनुमान से पहले पत्तियों पर जैविक कवकनाशी का सुरक्षात्मक लेप लगाएं।'
    },
    organicSolutions: [
      {
        id: 'lime-sulfur',
        nameEn: 'Liquid Lime Sulfur (Calcium Polysulfide)',
        nameHi: 'तरल चूना-गंधक घोल (लाइम सल्फर)',
        badge: 'Horticultural Classic • Certified Organic',
        preparationEn: 'Dilute 15-20ml liquid lime sulfur in 1 litre water during delayed dormant to pink bud stage.',
        preparationHi: 'गुलाबी कली (Pink bud) अवस्था में 1 लीटर पानी में 15-20ml लाइम सल्फर घोलें।',
        dosagePerLiter: '15 ml / Litre',
        dosageUnitPerLiter: 15,
        unitType: 'ml',
        timingEn: 'Apply before blooming or during dormant stage. Do not spray within 14 days of any horticultural oil.',
        timingHi: 'फूल खिलने से पहले छिड़कें। किसी तेल वाले स्प्रे के 14 दिनों के भीतर इसका उपयोग न करें।',
        benefitsEn: 'Suppresses overwintering scab spores on bark and shoots without causing synthetic chemical buildup in orchard soil.',
        benefitsHi: 'पेड़ की छाल में छिपे फंगस के बीजाणुओं को खत्म करता है और मिट्टी में कोई रासायनिक जहर नहीं छोड़ता।',
        costRating: 'Low Cost'
      },
      {
        id: 'serenade-bio',
        nameEn: 'Bacillus amyloliquefaciens (Serenade Bio-Fungicide)',
        nameHi: 'बैसिलस अमाइलोलिक्विफेशिएन्स बायो-फंगीसाइड',
        badge: 'Biological Antagonist • Zero PHI Days',
        preparationEn: 'Mix 4ml bio-inoculant per 1 litre of clean water. Spray immediately.',
        preparationHi: '1 लीटर पानी में 4ml जैविक जीवाणु घोल मिलाकर स्प्रे करें।',
        dosagePerLiter: '4 ml / Litre',
        dosageUnitPerLiter: 4,
        unitType: 'ml',
        timingEn: 'Spray every 7-10 days from petal fall until harvest.',
        timingHi: 'पंखुड़ियां गिरने से लेकर फल पकने तक हर 7-10 दिन में छिड़कें।',
        benefitsEn: 'Safe right up to day of harvest (0-day pre-harvest interval), protects fruit finish without blemishes.',
        benefitsHi: 'फल तोड़ने के दिन भी छिड़क सकते हैं (0 दिन की प्रतीक्षा), सेब की चमक व गुणवत्ता बनाए रखता है।',
        costRating: 'Low Cost'
      }
    ],
    chemicalSolutions: [
      {
        id: 'difenoconazole',
        chemicalName: 'Difenoconazole 25% EC (Score 25 EC)',
        tradeNames: 'Score, Rubigan, Topas',
        formulation: 'Systemic EC',
        dosagePerLiter: '0.3 ml / Litre (4.5ml per 15L Pump)',
        dosageUnitPerLiter: 0.3,
        unitType: 'ml',
        instructionEn: 'High-potency systemic kick-back curative fungicide. Halts scab within 72 hours of rain infection event.',
        instructionHi: 'अत्यंत प्रभावी प्रणालीगत कवकनाशी। बारिश के बाद शुरू हुए संक्रमण को 72 घंटे के भीतर रोक देता है।',
        preHarvestIntervalDays: 14,
        toxicityClass: 'Moderately Toxic (Blue)',
        safetyPrecautionsEn: 'Rotate with contact protective fungicides like Captan or Mancozeb to prevent fungicide resistance.',
        safetyPrecautionsHi: 'प्रतिरोध से बचने के लिए इसे मैनकोजेब या कैप्टन के साथ बदल-बदल कर इस्तेमाल करें।'
      }
    ],
    preventionRulesEn: [
      'Prune apple canopy during winter to permit rapid drying of leaves after rain.',
      'Spray 5% urea solution onto fallen autumn orchard leaves to speed up decomposition and eliminate scab spores.',
      'Choose scab-resistant apple cultivars (e.g., Honeycrisp, Enterprise, Prima).'
    ],
    preventionRulesHi: [
      'सर्दियों में पेड़ों की सही छंटाई (Pruning) करें ताकि हवा और धूप अंदर तक जा सके।',
      'पतझड़ में नीचे गिरी पत्तियों पर 5% यूरिया का छिड़काव करें ताकि पत्तियां जल्दी सड़ें और फंगस नष्ट हो।',
      'स्कैब-प्रतिरोधी उन्नत सेब की किस्मों का चयन करें।'
    ]
  },

  'bacterial spot': {
    diseaseKey: 'bacterial spot',
    cropName: 'Pepper / Chilli / Tomato',
    diseaseName: 'Bacterial Spot (Xanthomonas spp.)',
    diseaseNameHi: 'जीवाणु धब्बा रोग (जैंथोमोनास)',
    severityThresholdForPesticide: 'Severe',
    summaryEn: 'Bacterial spot causes water-soaked greasy spots. Standard fungicides do not kill bacteria. Prioritize bio-agents (Bacillus subtilis, copper hydroxide, and bacteriophage bio-washes). Antibiotics or chemical copper are for extreme emergencies only.',
    summaryHi: 'बैक्टीरियल स्पॉट में पानी से भीगे तैलीय धब्बे बनते हैं। सामान्य फफूंदनाशक बैक्टीरिया को नहीं मारते। जैविक जीवाणुनाशक व कॉपर हाइड्रोक्साइड को पहली प्राथमिकता दें। केवल गंभीर अवस्था में ही रासायनिक उपाय करें।',
    timelinePlan: {
      day1En: 'Avoid working in wet fields (spreads bacteria). Spray 2% Neem oil + Bio-control Bacillus subtilis.',
      day1Hi: 'गीले खेत में काम न करें (इससे बैक्टीरिया हाथों-कपड़ों से फैलता है)। 2% नीम तेल + बैसिलस का स्प्रे करें।',
      day3En: 'Apply fermented sour buttermilk or mild copper soap foliar mist.',
      day3Hi: 'खट्टी छाछ या जैविक कॉपर साबुन का हल्का छिड़काव करें।',
      day7En: 'Assess leaf drop. Remove fallen infected debris and keep drip lines clean.',
      day7Hi: 'पत्तियों के झड़ने का निरीक्षण करें। नीचे गिरी पत्तियों को खेत से हटाएं और ड्रिप लाइन साफ रखें।'
    },
    organicSolutions: [
      {
        id: 'bacillus-subtilis',
        nameEn: 'Bacillus subtilis Bio-Bactericide',
        nameHi: 'बैसिलस सबटिलिस जैविक जीवाणुनाशक',
        badge: 'Natural Bacterial Antagonist • 100% Organic',
        preparationEn: 'Mix 5g Bacillus subtilis powder per 1 litre of clean non-chlorinated water.',
        preparationHi: '1 लीटर साफ पानी (बिना क्लोरीन वाला) में 5 ग्राम बैसिलस सबटिलिस पाउडर घोलें।',
        dosagePerLiter: '5 g / Litre (75g per 15L Pump)',
        dosageUnitPerLiter: 5,
        unitType: 'g',
        timingEn: 'Spray uniformly across pepper foliage in the early morning or evening.',
        timingHi: 'सुबह या शाम के समय मिर्च की पत्तियों पर एकसमान छिड़काव करें।',
        benefitsEn: 'Produces natural lipopeptides that burst Xanthomonas bacterial cell walls without damaging plant tissues.',
        benefitsHi: 'यह मित्र बैक्टीरिया हानिकारक जीवाणुओं की कोशिका को नष्ट करता है, पौधे को कोई नुकसान नहीं पहुंचाता।',
        costRating: 'Low Cost'
      },
      {
        id: 'copper-hydroxide',
        nameEn: 'Copper Hydroxide (Kocide 3000 Bio-Protectant)',
        nameHi: 'कॉपर हाइड्रोक्साइड (सुरक्षात्मक जैविक कॉपर)',
        badge: 'Protective Barrier • Micro-particle Copper',
        preparationEn: 'Dissolve 2g Copper Hydroxide per 1 litre of water. Stir thoroughly.',
        preparationHi: '1 लीटर पानी में 2 ग्राम कॉपर हाइड्रोक्साइड अच्छी तरह घोलें।',
        dosagePerLiter: '2 g / Litre (30g per 15L Pump)',
        dosageUnitPerLiter: 2,
        unitType: 'g',
        timingEn: 'Spray every 7-10 days during warm rainy weather.',
        timingHi: 'गर्म और बरसात के मौसम में हर 7-10 दिन पर छिड़काव करें।',
        benefitsEn: 'Releases bio-active copper ions to eliminate bacterial film on leaf surface.',
        benefitsHi: 'पत्ती की सतह पर कॉपर आयन छोड़ता है जो जीवाणुओं की परत को खत्म करते हैं।',
        costRating: 'Low Cost'
      }
    ],
    chemicalSolutions: [
      {
        id: 'streptocycline-copper',
        chemicalName: 'Streptocycline 90% + Copper Oxychloride 50%',
        tradeNames: 'Streptocycline + Blitox 50, Plantomycin',
        formulation: 'Antibacterial Powder',
        dosagePerLiter: '0.1g Streptocycline + 2.5g Copper Oxychloride / Litre (1.5g + 37.5g in 15L Pump)',
        dosageUnitPerLiter: 2.6,
        unitType: 'g',
        instructionEn: 'Special emergency bacterial rescue treatment. Dissolve 1 pouch (6g) Streptocycline in 60L water alongside Copper Oxychloride.',
        instructionHi: 'विशेष आपातकालीन जीवाणुनाशक उपचार। 60 लीटर पानी में 1 पाउच (6 ग्राम) स्ट्रेप्टोसाइक्लिन और कॉपर ऑक्सीक्लोराइड मिलाकर छिड़कें।',
        preHarvestIntervalDays: 14,
        toxicityClass: 'Moderately Toxic (Blue)',
        safetyPrecautionsEn: 'Wear protective goggles, gloves, and mask. Never harvest chilli or fruit within 14 days of application.',
        safetyPrecautionsHi: 'छिड़काव के समय चश्मा, दस्ताने और मास्क अवश्य लगाएं। छिड़काव के 14 दिन बाद ही फल तोड़ें।'
      }
    ],
    preventionRulesEn: [
      'Always treat seeds in hot water (50°C for 25 minutes) before sowing to eradicate seed-borne Xanthomonas.',
      'Never touch or weed crop foliage when leaves are wet with rain or early morning dew.',
      'Sterilize pruning shears and farm tools with 10% bleach or isopropyl alcohol between rows.'
    ],
    preventionRulesHi: [
      'बुवाई से पहले बीजों को 50°C गर्म पानी में 25 मिनट उपचारित करें ताकि बीज के अंदर का बैक्टीरिया खत्म हो सके।',
      'जब पत्तियां बारिश या ओस से भीगी हों, तब पौधों को हाथ न लगाएं और न ही निराई-गुड़ाई करें।',
      'कैंची व कृषि औजारों को डेटॉल या सैनिटाइजर से साफ करके ही दूसरे पौधों में इस्तेमाल करें।'
    ]
  },

  'healthy': {
    diseaseKey: 'healthy',
    cropName: 'Healthy Crop Specimen',
    diseaseName: 'Healthy Leaf (स्वस्थ फसल)',
    diseaseNameHi: 'स्वस्थ पत्ती - कोई रोग नहीं',
    severityThresholdForPesticide: 'Severe',
    summaryEn: 'Congratulations! Your crop foliage shows excellent chlorophyll vitality with zero disease or pathogen infestation. No chemical pesticides or fungicides are needed! Continue organic maintenance.',
    summaryHi: 'बधाई हो! आपकी फसल पूरी तरह स्वस्थ है और इसमें कोई रोग नहीं है। किसी भी रासायनिक कीटनाशक या फफूंदनाशक की बिल्कुल जरूरत नहीं है! केवल जैविक पोषण और सुरक्षा जारी रखें।',
    timelinePlan: {
      day1En: 'Maintain regular drip irrigation and inspect under leaves weekly.',
      day1Hi: 'नियमित ड्रिप सिंचाई जारी रखें और हर हफ्ते पत्तियों के नीचे कीटों की जांच करें।',
      day3En: 'Apply foliar spray of Jeevamrit or diluted seaweed tonic to sustain vibrant green canopy.',
      day3Hi: 'पत्तियों को और अधिक चमकदार व मजबूत बनाने के लिए जीवामृत या सीवीड टॉनिक का हल्का छिड़काव करें।',
      day7En: 'Ensure balanced organic mulch to conserve soil moisture and prevent weed growth.',
      day7Hi: 'मृदा में नमी बनाए रखने और खरपतवार रोकने के लिए जैविक मल्चिंग बनाए रखें।'
    },
    organicSolutions: [
      {
        id: 'jeevamrit',
        nameEn: 'Jeevamrit Bio-Tonic (जीवामृत)',
        nameHi: 'देसी जीवामृत जैविक टॉनिक',
        badge: 'Vedic Micro-Biome Booster • 100% Natural',
        preparationEn: 'Mix 10kg cow dung + 10L cow urine + 2kg jaggery + 2kg gram flour (besan) + handful field soil in 200L water. Ferment for 4 days.',
        preparationHi: '10 किलो गोबर + 10L गोमूत्र + 2 किलो गुड़ + 2 किलो बेसन + मुट्ठी भर खेत की उपजाऊ मिट्टी को 200L पानी में मिलाकर 4 दिन सड़ाएं।',
        dosagePerLiter: '100 ml / Litre',
        dosageUnitPerLiter: 100,
        unitType: 'ml',
        timingEn: 'Drench in soil or spray 10% filtered solution every 15 days.',
        timingHi: 'हर 15 दिन में पानी के साथ सिंचाई में दें या 10% छना हुआ घोल पत्तियों पर छिड़कें।',
        benefitsEn: 'Infuses billions of beneficial soil microbes, strengthens crop cellular walls against future pest attacks.',
        benefitsHi: 'करोड़ों लाभकारी सूक्ष्मजीव प्रदान करता है और पौधे की रोग प्रतिरोधक क्षमता को शीर्ष स्तर पर रखता है।',
        costRating: 'Free / Kitchen'
      },
      {
        id: 'preventive-neem',
        nameEn: 'Preventive Neem Seed Kernel Extract (NSKE 5%)',
        nameHi: 'नीम की निंबोली का अर्क (NSKE 5% निवारक कवच)',
        badge: 'Preventive Repellent Shield',
        preparationEn: 'Pound 50g neem seed kernels in 1 litre water overnight. Strain through muslin cloth and add 2ml soap.',
        preparationHi: '50 ग्राम नीम की निंबोली को कूटकर 1L पानी में रात भर भिगोएं। सुबह कपड़े से छानकर 2ml साबुन मिलाकर छिड़कें।',
        dosagePerLiter: '50 ml / Litre',
        dosageUnitPerLiter: 50,
        unitType: 'ml',
        timingEn: 'Spray every 15-20 days as a non-toxic protective shield.',
        timingHi: 'हर 15-20 दिन में फसल पर सुरक्षात्मक ढाल के रूप में छिड़कें।',
        benefitsEn: 'Repels piercing-sucking insect vectors (aphids, whiteflies) that carry viral and fungal diseases.',
        benefitsHi: 'माहू, सफेद मक्खी और रस चूसक कीटों को दूर रखता है जो बीमारियां फैलाते हैं।',
        costRating: 'Free / Kitchen'
      }
    ],
    chemicalSolutions: [],
    preventionRulesEn: [
      'Maintain adequate plant spacing and avoid excessive chemical nitrogen fertilizer which causes soft watery growth prone to fungi.',
      'Install yellow and blue sticky traps (10 traps per acre) to monitor and catch early insect vectors.',
      'Rotate crops each season to preserve soil microbial balance.'
    ],
    preventionRulesHi: [
      'पौधों के बीच सही दूरी रखें और जरूरत से ज्यादा यूरिया न डालें, क्योंकि अधिक यूरिया से फसल नाजुक होकर जल्दी बीमार पड़ती है।',
      'खेत में 1 एकड़ में 10 पीले और नीले चिपचिपे ट्रैप लगाएं ताकि कीटों पर नजर रहे।',
      'हर सीजन में फसल बदलकर बोएं ताकि मिट्टी की ताकत बनी रहे।'
    ]
  }
};

// Helper to look up disease guide based on prediction disease name or fallback to realistic default
export function getTreatmentGuide(diseaseName: string, cropName: string, isHealthy: boolean): DiseaseTreatmentGuide {
  if (isHealthy) {
    return DISEASE_TREATMENT_DATABASE['healthy'];
  }

  const normalized = (diseaseName + ' ' + cropName).toLowerCase();

  if (normalized.includes('late blight')) {
    return DISEASE_TREATMENT_DATABASE['late blight'];
  }
  if (normalized.includes('early blight') || normalized.includes('blight')) {
    return DISEASE_TREATMENT_DATABASE['early blight'];
  }
  if (normalized.includes('rust')) {
    return DISEASE_TREATMENT_DATABASE['common rust'];
  }
  if (normalized.includes('scab')) {
    return DISEASE_TREATMENT_DATABASE['apple scab'];
  }
  if (normalized.includes('bacterial') || normalized.includes('spot')) {
    return DISEASE_TREATMENT_DATABASE['bacterial spot'];
  }

  // Fallback to Early Blight general protocol adapted for this crop
  const base = DISEASE_TREATMENT_DATABASE['early blight'];
  return {
    ...base,
    cropName: cropName || 'General Crop',
    diseaseName: diseaseName || 'Crop Pathogen Infestation',
    diseaseNameHi: `${diseaseName || 'फसल बीमारी'} (जैविक प्राथमिकता)`,
  };
}
