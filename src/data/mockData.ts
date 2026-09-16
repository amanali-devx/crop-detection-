import { CropKnowledge, FeatureItem, FAQItem, SampleLeaf, TeamMember, TimelineStep, ArchitectureNode } from '../types';

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'sample-tomato-blight',
    crop: 'Tomato',
    condition: 'Early Blight (Alternaria solani)',
    type: 'Diseased',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
    description: 'Concentric dark brown circular rings with chlorotic yellow halo on lower tomato foliage.',
    defaultResult: {
      cropName: 'Tomato (Solanum lycopersicum)',
      diseaseName: 'Early Blight',
      scientificName: 'Alternaria solani',
      isHealthy: false,
      confidence: 97.4,
      severity: 'Moderate',
      symptoms: [
        'Concentric brown-black circular rings (bullseye pattern)',
        'Yellow chlorotic halos surrounding necrotic leaf spots',
        'Premature defoliation starting from oldest lower leaves',
        'Sunscald vulnerability on ripening fruits due to canopy loss'
      ],
      treatment: {
        organic: [
          'Foliar spray of 2% cold-pressed Neem Seed Oil (Azadirachtin)',
          'Apply Trichoderma viride or Bacillus subtilis bio-fungicide slurry',
          'Prune lower infected foliage and safely bury away from compost'
        ],
        chemical: [
          'Mancozeb 75% WP @ 2.5g per litre of water at first symptom onset',
          'Chlorothalonil or Copper Oxychloride 50% WP @ 3g/L spray every 10-14 days',
          'Alternate with systemic Azoxystrobin to prevent fungicide resistance'
        ],
        prevention: [
          'Drip irrigation instead of overhead sprinklers to minimize leaf wetness',
          'Ensure 60cm plant spacing for adequate air circulation',
          'Follow a 3-year crop rotation without Solanaceous crops'
        ]
      },
      cropHealthScore: 62,
      spreadRisk: 'High'
    }
  },
  {
    id: 'sample-potato-blight',
    crop: 'Potato',
    condition: 'Late Blight (Phytophthora infestans)',
    type: 'Diseased',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    description: 'Water-soaked irregular dark necrotic lesions with white fungal sporulation under high humidity.',
    defaultResult: {
      cropName: 'Potato (Solanum tuberosum)',
      diseaseName: 'Late Blight',
      scientificName: 'Phytophthora infestans',
      isHealthy: false,
      confidence: 98.8,
      severity: 'Severe',
      symptoms: [
        'Dark, water-soaked irregular lesions on leaf margins and tips',
        'Delicate white fungal downy mildew on leaf undersides in humid conditions',
        'Rapid tissue collapse and blackening within 48-72 hours',
        'Foul decaying odor in heavily infested field zones'
      ],
      treatment: {
        organic: [
          'Immediate Bordeaux Mixture (1% copper sulphate + slaked lime) foliar application',
          'Potassium bicarbonate foliar spray @ 5g/L to inhibit spore germination',
          'Uproot and destroy heavily affected plants to create a firebreak'
        ],
        chemical: [
          'Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2.5g/L water',
          'Cymoxanil + Mancozeb @ 2g/L as an emergency translaminar curative spray',
          'Follow mandatory 14-day pre-harvest interval for chemical treatments'
        ],
        prevention: [
          'Plant certified pathogen-free seed tubers with high disease tolerance (e.g. Kufri Girdhari)',
          'High earthing up of ridges to prevent zoospore runoff into tubers',
          'Monitor regional weather warnings (humidity > 90% and temp 15-22°C)'
        ]
      },
      cropHealthScore: 38,
      spreadRisk: 'High'
    }
  },
  {
    id: 'sample-corn-rust',
    crop: 'Corn (Maize)',
    condition: 'Common Rust (Puccinia sorghi)',
    type: 'Diseased',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    description: 'Golden-brown to cinnamon pustules scattered densely across upper and lower corn leaves.',
    defaultResult: {
      cropName: 'Corn / Maize (Zea mays)',
      diseaseName: 'Common Rust',
      scientificName: 'Puccinia sorghi',
      isHealthy: false,
      confidence: 96.2,
      severity: 'Moderate',
      symptoms: [
        'Oval to elongate powdery golden-brown pustules on both leaf surfaces',
        'Pustules rupture epidermal skin releasing millions of reddish urediniospores',
        'Chlorotic striping and early leaf senescence leading to stunted cobs',
        'Reduced grain weight and impaired photosynthetic efficiency'
      ],
      treatment: {
        organic: [
          'Sulfur dust or wettable sulfur (80% WP) applied at 3kg/hectare',
          'Bio-protectant spray of Ampelomyces quisqualis parasitic fungus',
          'Ensure balanced potassium fertilization to reinforce leaf cell walls'
        ],
        chemical: [
          'Propiconazole 25% EC (Tilt) @ 1ml/L water upon seeing 6 pustules/leaf',
          'Pyraclostrobin or Tebuconazole fungicide spray during tasseling stage',
          'Single calibrated spray typically suffices if applied before silking'
        ],
        prevention: [
          'Sow rust-resistant hybrid seed varieties suited for your agro-climatic zone',
          'Avoid delayed or staggered seasonal sowing in adjacent plots',
          'Maintain field sanitation and eradicate Oxalis alternative weed hosts'
        ]
      },
      cropHealthScore: 68,
      spreadRisk: 'Medium'
    }
  },
  {
    id: 'sample-apple-scab',
    crop: 'Apple',
    condition: 'Apple Scab (Venturia inaequalis)',
    type: 'Diseased',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
    description: 'Olive-green to velvety dark brown lesions on foliage and corky cracking on developing fruit.',
    defaultResult: {
      cropName: 'Apple (Malus domestica)',
      diseaseName: 'Apple Scab',
      scientificName: 'Venturia inaequalis',
      isHealthy: false,
      confidence: 95.9,
      severity: 'Moderate',
      symptoms: [
        'Olive-green to dark velvety lesions with feathery borders on upper leaf surface',
        'Distortion and premature yellowing of leaf blades',
        'Scab lesions turn corky, dark brown, and crack on immature apples',
        'Severely reduced market grade and storage longevity'
      ],
      treatment: {
        organic: [
          'Liquid lime sulfur spray during dormant bud break stage',
          'Serenade ASO (Bacillus amyloliquefaciens) bio-fungicide application',
          'Collect and shred fallen autumn leaves to eliminate overwintering pseudothecia'
        ],
        chemical: [
          'Difenoconazole 25% EC @ 0.3ml/L water at green tip to pink bud stage',
          'Dodine 65% WP or Captan 50% WP protective sprays before anticipated rains',
          'Integrate myclobutanil post-infection kickback spray within 72 hours'
        ],
        prevention: [
          'Prune orchard canopy annually to foster rapid drying of foliage',
          'Apply 5% urea spray on leaf litter in late autumn to accelerate decomposition',
          'Select scab-resistant cultivars like Honeycrisp, Prima, or Enterprise'
        ]
      },
      cropHealthScore: 71,
      spreadRisk: 'Medium'
    }
  },
  {
    id: 'sample-pepper-spot',
    crop: 'Pepper',
    condition: 'Bacterial Spot (Xanthomonas euvesicatoria)',
    type: 'Diseased',
    imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&w=800&q=80',
    description: 'Small water-soaked circular lesions with tan centers and yellow translucent edges.',
    defaultResult: {
      cropName: 'Bell Pepper (Capsicum annuum)',
      diseaseName: 'Bacterial Spot',
      scientificName: 'Xanthomonas euvesicatoria',
      isHealthy: false,
      confidence: 94.7,
      severity: 'Mild',
      symptoms: [
        'Small, circular to angular water-soaked dark spots on leaves',
        'Spots turn necrotic with brown sunken centers and distinct yellow rings',
        'Rough, raised warty scabs on fruit skin',
        'Severe blossom drop and leaf loss under warm, rain-splattered weather'
      ],
      treatment: {
        organic: [
          'Streptomyces bio-bactericide foliar applications',
          'Copper hydroxide + hydrogen peroxide foliar misting',
          'Disinfect all pruning shears and farming tools in 10% bleach solution'
        ],
        chemical: [
          'Copper Hydroxide 77% WP @ 2.5g/L combined with Mancozeb for synergistic control',
          'Plantomycin / Streptocycline agricultural antibiotic @ 1g in 10L water',
          'Apply immediately after rainstorms to curb bacterial splash dispersion'
        ],
        prevention: [
          'Use hot-water treated (50°C for 25 mins) certified disease-free seeds',
          'Never handle or cultivate wet pepper plants in early mornings',
          'Utilize plastic mulch to prevent contaminated soil splashing onto leaves'
        ]
      },
      cropHealthScore: 78,
      spreadRisk: 'Medium'
    }
  },
  {
    id: 'sample-healthy-leaf',
    crop: 'Tomato',
    condition: 'Optimal Plant Health (Chlorophyll Vitality)',
    type: 'Healthy',
    imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=800&q=80',
    description: 'Vibrant emerald green leaf blade, intact cuticle, and zero fungal or bacterial lesions.',
    defaultResult: {
      cropName: 'Tomato (Solanum lycopersicum)',
      diseaseName: 'Healthy Leaf Tissue',
      scientificName: 'Non-Pathogenic Specimen',
      isHealthy: true,
      confidence: 99.3,
      severity: 'Healthy',
      symptoms: [
        'Intact epidermal tissue with deep chlorophyll pigment',
        'Uniform leaf margin geometry and vigorous venation network',
        'Zero fungal mycelium, bacterial necrosis, or pest feeding punctures',
        'Stomata functioning at optimum transpiration and gas exchange'
      ],
      treatment: {
        organic: [
          'Maintain monthly vermicompost top-dressing (250g per root zone)',
          'Apply prophylactic Panchagavya or Seaweed extract tonic foliar spray',
          'Encourage beneficial pollinators and ladybird predatory insects'
        ],
        chemical: [
          'No chemical fungicides or bactericides required at this stage',
          'Maintain balanced N-P-K (19:19:19) water-soluble fertigation schedule',
          'Conduct periodic micronutrient check (Boron, Zinc, Calcium)'
        ],
        prevention: [
          'Continue bi-weekly visual inspections during peak vegetative flush',
          'Keep soil moisture consistent with tensiometer monitoring',
          'Maintain field border trap crops like Marigolds to deter whiteflies'
        ]
      },
      cropHealthScore: 98,
      spreadRisk: 'Low'
    }
  }
];

export const FEATURES: FeatureItem[] = [
  {
    id: 'feature-ai',
    title: 'AI Disease Detection',
    description: 'Trained on 87,000+ pathological images from PlantVillage with MobileNetV2 deep neural convolution for micro-lesion analysis.',
    iconName: 'Cpu',
    metric: '98.4%',
    metricLabel: 'Model Accuracy'
  },
  {
    id: 'feature-speed',
    title: 'Instant Results',
    description: 'Sub-second edge inference delivers comprehensive diagnostic results in less than 1.2 seconds, optimized for 3G/4G field mobile networks.',
    iconName: 'Zap',
    metric: '< 1.2s',
    metricLabel: 'Processing Speed'
  },
  {
    id: 'feature-treatment',
    title: 'Treatment Suggestions',
    description: 'Scientifically validated dual-path remediation: immediate organic bio-controls plus precision chemical fungicide recommendations.',
    iconName: 'Sparkles',
    metric: '100%',
    metricLabel: 'Actionable Guidance'
  },
  {
    id: 'feature-health',
    title: 'Crop Health Analysis',
    description: 'Computes overall leaf health index, spread risk classification, and symptom progression to safeguard entire field yield.',
    iconName: 'Activity',
    metric: '38+',
    metricLabel: 'Pathology Classes'
  },
  {
    id: 'feature-interface',
    title: 'Fast & Easy Interface',
    description: 'Designed specifically for grassroots kisan usage: zero technical jargon, intuitive high-contrast icons, and single-tap photo scanning.',
    iconName: 'Smartphone',
    metric: '1-Tap',
    metricLabel: 'Effortless Workflow'
  },
  {
    id: 'feature-secure',
    title: 'Secure AI Model',
    description: 'Zero unauthorized data harvesting. Image processing adheres to data security protocols, ensuring complete farmer ownership.',
    iconName: 'ShieldCheck',
    metric: '256-bit',
    metricLabel: 'Encrypted Pipeline'
  }
];

export const CROP_KNOWLEDGE: CropKnowledge[] = [
  {
    id: 'crop-tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    tagline: 'High-value vegetable crop vulnerable to early/late blight and leaf curl virus.',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
    commonDiseases: ['Early Blight', 'Late Blight', 'Yellow Leaf Curl', 'Septoria Leaf Spot', 'Bacterial Canker'],
    symptoms: [
      'Concentric target-like rings on mature leaves',
      'Curling and stunted apical leaf clusters',
      'Water-soaked lesions on green fruit'
    ],
    preventionTips: [
      'Avoid sprinkler irrigation; use root-zone drip lines',
      'Stake plants to maintain foliage 30cm above damp soil',
      'Apply preventative Trichoderma bio-formulation'
    ],
    optimalConditions: {
      temp: '21°C – 29°C',
      soil: 'Well-drained loam, pH 6.0 – 6.8',
      water: '1.5 – 2 inches weekly'
    }
  },
  {
    id: 'crop-potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    tagline: 'Staple tuber crop highly prone to devastating late blight epiphytotics.',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    commonDiseases: ['Late Blight', 'Early Blight', 'Blackleg', 'Common Scab', 'Potato Virus Y'],
    symptoms: [
      'Dark water-soaked leaf borders spreading to stem',
      'White fungal sporulation during foggy cold mornings',
      'Brown necrotic rot inside harvested tubers'
    ],
    preventionTips: [
      'Sow certified pathogen-free seed tubers only',
      'Maintain high ridge earthing-up around plant bases',
      'Spray Mancozeb prophylactically before winter fog'
    ],
    optimalConditions: {
      temp: '15°C – 20°C',
      soil: 'Loose sandy loam, pH 5.2 – 6.4',
      water: 'Consistent moisture, avoid waterlogging'
    }
  },
  {
    id: 'crop-corn',
    name: 'Corn (Maize)',
    scientificName: 'Zea mays',
    tagline: 'Crucial grain and forage crop affected by rust, blight, and smut fungi.',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    commonDiseases: ['Common Rust', 'Northern Corn Leaf Blight', 'Gray Leaf Spot', 'Smut', 'Stalk Rot'],
    symptoms: [
      'Golden-brown to cinnamon raised powder pustules',
      'Long elliptical grayish-green leaf lesions',
      'Galls filled with dark powdery fungal chlamydospores'
    ],
    preventionTips: [
      'Plant high-yielding disease-resistant hybrid cultivars',
      'Destroy crop residue after harvest through deep tillage',
      'Apply propiconazole when rust spots appear on lower leaves'
    ],
    optimalConditions: {
      temp: '20°C – 32°C',
      soil: 'Deep fertile silt loam, pH 5.8 – 7.0',
      water: 'Crucial during silking & tasseling'
    }
  },
  {
    id: 'crop-apple',
    name: 'Apple',
    scientificName: 'Malus domestica',
    tagline: 'Horticultural cash crop vulnerable to scab, powdery mildew, and fire blight.',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
    commonDiseases: ['Apple Scab', 'Black Rot', 'Cedar Apple Rust', 'Powdery Mildew', 'Fire Blight'],
    symptoms: [
      'Olive-green velvety patches on spring leaves',
      'Corky cracked lesions that deform apple skin',
      'White powdery mycelium coating succulent shoots'
    ],
    preventionTips: [
      'Perform annual winter pruning for maximum sunlight penetration',
      'Compost or spray urea on leaf litter to kill winter spore reserves',
      'Follow regional advisory for early spring copper sprays'
    ],
    optimalConditions: {
      temp: 'Chilling hours (<7°C) + summer 18°C – 24°C',
      soil: 'Deep well-drained loamy soil, pH 6.0 – 6.8',
      water: 'Moderate regular irrigation'
    }
  },
  {
    id: 'crop-pepper',
    name: 'Bell & Chilli Pepper',
    scientificName: 'Capsicum annuum',
    tagline: 'Spice and salad staple frequently infected by bacterial spot and anthracnose.',
    imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&w=800&q=80',
    commonDiseases: ['Bacterial Spot', 'Anthracnose', 'Cercospora Leaf Spot', 'Phytophthora Blight'],
    symptoms: [
      'Circular sunken dark lesions with concentric rings on pods',
      'Water-soaked spots with yellow chlorotic rings on leaves',
      'Sudden permanent wilting under warm waterlogged soils'
    ],
    preventionTips: [
      'Hot-water soak seed treatment before germination nursery',
      'Never prune or harvest while foliage is wet from morning dew',
      'Apply copper hydroxide bactericide following rain events'
    ],
    optimalConditions: {
      temp: '20°C – 30°C',
      soil: 'Rich organic loam with good drainage, pH 6.0 – 7.0',
      water: 'Even moisture, sensitive to overwatering'
    }
  },
  {
    id: 'crop-healthy',
    name: 'Healthy Leaves & Vigor',
    scientificName: 'Optimal Crop Phenotype',
    tagline: 'Standard morphological baseline for maximum photosynthesis and high yield.',
    imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=800&q=80',
    commonDiseases: ['No Pathologies Present (Baseline Control)'],
    symptoms: [
      'Crisp, uniform emerald pigment without chlorosis',
      'Turgid cell structures indicating balanced moisture',
      'Healthy unblemished leaf margins and primary veins'
    ],
    preventionTips: [
      'Conduct soil testing every 2 seasons for nutrient calibration',
      'Practice integrated pest management (IPM) with yellow sticky cards',
      'Mulch soil to preserve root mycorrhizal microbiology'
    ],
    optimalConditions: {
      temp: 'Species specific',
      soil: 'Organic carbon content > 0.8%',
      water: 'Soil moisture tension maintained at 20-30 kPa'
    }
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    step: 1,
    title: 'Upload Image',
    subtitle: 'High-Resolution Field Capture',
    description: 'Capture or drag-and-drop any leaf photo directly from your smartphone or desktop in the field. Works even in natural sunlight.',
    iconName: 'UploadCloud',
    tag: 'Step 01'
  },
  {
    step: 2,
    title: 'AI Processes Image',
    subtitle: 'MobileNetV2 Deep Convolution',
    description: 'Neural networks preprocess the image to 224x224 tensor format, isolating lesion textures, chlorophyll variance, and boundary patterns.',
    iconName: 'Cpu',
    tag: 'Step 02'
  },
  {
    step: 3,
    title: 'Disease Prediction',
    subtitle: 'Multiclass Pathology Matching',
    description: 'The model cross-references 38+ plant pathology classes with softmax classification, generating a verified confidence index in milliseconds.',
    iconName: 'CheckCircle2',
    tag: 'Step 03'
  },
  {
    step: 4,
    title: 'Prevention & Treatment',
    subtitle: 'Agronomist-Grade Action Plan',
    description: 'Receive immediate organic remedies (Neem, Trichoderma) alongside precision chemical dosage schedules to stop field infection immediately.',
    iconName: 'ShieldPlus',
    tag: 'Step 04'
  }
];

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'node-farmer',
    title: 'Farmer Field Device',
    role: 'Client Edge',
    technology: 'Mobile Web / Progressive Web App',
    description: 'Farmers take photos via camera or file upload directly in their fields. Optimized for responsive touch and low bandwidth.',
    iconName: 'Smartphone',
    latency: '0ms (Edge)'
  },
  {
    id: 'node-frontend',
    title: 'React 19 Frontend',
    role: 'UI/UX Interface',
    technology: 'React + Vite + Tailwind + Motion',
    description: 'High-performance reactive frontend featuring drag-and-drop scanning, animated HUD visualizers, and state persistence.',
    iconName: 'Layout',
    latency: '< 15ms'
  },
  {
    id: 'node-backend',
    title: 'Backend API Gateway',
    role: 'Orchestrator',
    technology: 'RESTful API / Python FastAPI / Express',
    description: 'Handles multipart image payload validation, base64 normalization, security rate-limiting, and inference dispatch.',
    iconName: 'Server',
    latency: '~45ms'
  },
  {
    id: 'node-model',
    title: 'MobileNetV2 AI Model',
    role: 'Deep Learning Core',
    technology: 'TensorFlow Lite / PyTorch Core',
    description: 'Pre-trained and fine-tuned depthwise separable convolutions running edge inference across 38+ plant pathology classes.',
    iconName: 'BrainCircuit',
    latency: '< 250ms'
  },
  {
    id: 'node-result',
    title: 'Prediction & Advisory',
    role: 'Agronomy Engine',
    technology: 'Dynamic Pathology Knowledge Base',
    description: 'Synthesizes pathogen diagnosis, confidence score, organic bio-remedies, and calibrated chemical dosage protocols for the farmer.',
    iconName: 'FileCheck',
    latency: '< 50ms'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Aman Ali',
    role: 'Frontend Developer & UI/UX Lead',
    sihRole: 'Smart India Hackathon 2026 Core Lead',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    initials: 'AA',
    bio: 'Specializing in reactive user interfaces, high-conversion product aesthetics, motion micro-interactions, and mobile-first farmer usability.',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'UI/UX Architecture']
  },
  {
    name: 'Sonu Saini',
    role: 'Backend Developer & Cloud Architect',
    sihRole: 'API Gateway & Infrastructure Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    initials: 'SS',
    bio: 'Architecting high-throughput REST APIs, serverless edge deployment, secure multipart image pipelines, and cloud telemetry.',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    skills: ['FastAPI', 'Node.js', 'Express', 'Docker', 'Cloud Infrastructure']
  },
  {
    name: 'Gurpreet Singh Saini',
    role: 'AI / ML Engineer',
    sihRole: 'Computer Vision & Deep Learning',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    initials: 'GS',
    bio: 'Tuning MobileNetV2 depthwise separable convolution layers, dataset augmentation, transfer learning, and cross-entropy optimization.',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    skills: ['PyTorch', 'TensorFlow', 'MobileNetV2', 'OpenCV', 'Model Quantization']
  },
  {
    name: 'Akshat Porwal',
    role: 'AI / ML & Prompt Engineer',
    sihRole: 'Agronomy Knowledge Systems & LLM Grounding',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    initials: 'AP',
    bio: 'Integrating agronomic knowledge retrieval, multilingual farmer prompt interfaces, symptom ontology mapping, and treatment synthesis.',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    skills: ['LLM Grounding', 'Prompt Engineering', 'NLP', 'Knowledge Graphs', 'Python']
  },
  {
    name: 'Ayesha',
    role: 'Documentation & Presentation Lead',
    sihRole: 'Research & SIH Pitch Strategist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    initials: 'AY',
    bio: 'Leading technical documentation, field farmer impact metrics, compliance research with ICAR standards, and SIH 2026 pitch design.',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    skills: ['Agronomy Research', 'Technical Writing', 'Impact Metrics', 'SIH Strategy', 'Stakeholder Pitching']
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does AI detect disease?',
    answer: 'FarmerDetect utilizes a fine-tuned MobileNetV2 deep convolutional neural network. When a leaf image is uploaded, the model identifies microscopic necrotic lesions, chlorotic yellowing patterns, spore clusters, and edge distortions across 38+ plant pathology classes, comparing them against over 87,000 verified agricultural specimens.',
    category: 'Technology'
  },
  {
    id: 'faq-2',
    question: 'Which crops are supported?',
    answer: 'FarmerDetect currently supports major staple and cash crops including Tomato, Potato, Corn (Maize), Apple, Bell & Chilli Pepper, Grape, Strawberry, Peach, and Cherry. The platform detects both specific bacterial, fungal, and viral infections as well as verifying completely healthy crops.',
    category: 'Crops'
  },
  {
    id: 'faq-3',
    question: 'Is internet required?',
    answer: 'While web access is used for remote cloud synchronizations and updates, FarmerDetect is built with lightweight MobileNetV2 architecture (less than 14MB quantized weights). It can execute edge-inference directly in browser memory and is designed for offline Progressive Web App (PWA) deployment in rural areas with intermittent connectivity.',
    category: 'Connectivity'
  },
  {
    id: 'faq-4',
    question: 'How accurate is the model?',
    answer: 'On benchmark PlantVillage and real-world field test sets, our model achieves a 98.4% top-1 validation accuracy. For every prediction, FarmerDetect provides an exact percentage confidence score and assigns a severity rating (Healthy, Mild, Moderate, or Severe) so farmers never have to second-guess treatment decisions.',
    category: 'Accuracy'
  },
  {
    id: 'faq-5',
    question: 'Can farmers use mobile phones?',
    answer: 'Yes! The entire application is built mobile-first. Any farmer with an Android or iOS smartphone can open FarmerDetect in Chrome, tap the Camera icon to snap a leaf photo directly in the sunlight, and receive instant diagnostic results and treatment schedules with zero installation required.',
    category: 'Usability'
  }
];
