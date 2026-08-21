import { ShowroomItem } from '../types';

export const INITIAL_SHOWROOM_ITEMS: ShowroomItem[] = [
  {
    id: 'cab-1',
    title: 'Minimalist Walnut & Calacatta Island Kitchen',
    category: 'kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Custom floor-to-ceiling American Walnut timber veneer joinery with continuous wood-grain matching, concealed appliance pantries, and seamless push-to-open flush doors.',
    location: 'Bayside Residence, Melbourne',
    style: 'Modern Minimalist',
    materials: ['American Walnut Veneer', 'Calacatta Marble Quartz', 'Matte Black Polyurethane'],
    hardware: 'Blum Tip-On Push-to-Open & Servo-Drive Integrated LED Channels',
    featured: true,
    year: '2025',
    dateAdded: '2025-01-15'
  },
  {
    id: 'cab-2',
    title: 'Coastal Hamptons Shaker Gourmet Kitchen',
    category: 'kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Classic handcrafted two-pack satin white shaker cabinetry, glass-front display overheads with mullion details, and a spacious central preparation island with butler sink.',
    location: 'Mornington Peninsula, VIC',
    style: 'Hamptons Coastal',
    materials: ['Two-Pack Satin Polyurethane', 'Engineered Quartz', 'Fluted Glass Overheads'],
    hardware: 'Brushed Brass Knurled Handles & Soft-Close Blum Tandembox Drawers',
    featured: true,
    year: '2025',
    dateAdded: '2025-02-10'
  },
  {
    id: 'cab-3',
    title: 'Floating Fluted Oak Double Vanity Suite',
    category: 'bathroom',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Bespoke wall-hung master ensuite vanity featuring custom curved fluted solid oak drawer fronts, integrated hidden internal charging drawers, and undermount basins.',
    location: 'Paddington, Sydney',
    style: 'Organic Modern',
    materials: ['Curved Solid White Oak', 'Terrazzo Stone Countertop', 'Moisture-Resistant HMR Carcass'],
    hardware: 'Grass Nova Pro Concealed Soft-Close Runners & Concealed Shadowline Lip',
    featured: true,
    year: '2024',
    dateAdded: '2024-11-20'
  },
  {
    id: 'cab-4',
    title: 'Walk-In Boutique Dressing Suite with LED Glass Showcases',
    category: 'wardrobe',
    imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1400&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Luxury master walk-in robe featuring smoked glass aluminium framed doors, integrated warm 3000K diffused vertical LED strip lighting, velvet-lined jewelry drawers, and shoe galleries.',
    location: 'Toorak Estate, Melbourne',
    style: 'Bespoke Luxury',
    materials: ['Smoked Glass with Bronze Aluminium Frame', 'Dark Charcoal Melamine', 'Velvet Drawer Inserts'],
    hardware: 'Salice Air Concealed Pivot Hinges & Sensor Activated LED Channels',
    featured: true,
    year: '2025',
    dateAdded: '2025-01-28'
  },
  {
    id: 'cab-5',
    title: 'Architectural Media Wall & Fireplace Joinery',
    category: 'living',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Full-height architectural living room joinery spanning 6 meters, integrating electric fireplace surround, acoustic timber acoustic slatting, and vented media equipment cabinets.',
    location: 'South Yarra, VIC',
    style: 'Contemporary Scandi',
    materials: ['Natural Timber Slat Wall', 'Matte Greige Laminate', 'Porcelain Hearth Surrounds'],
    hardware: 'Magnetic Touch Latches & Vented Acoustic Speaker Mesh Fronts',
    featured: false,
    year: '2024',
    dateAdded: '2024-10-12'
  },
  {
    id: 'cab-6',
    title: 'Executive Boardroom Credenza & Bar Station',
    category: 'commercial',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80',
    description: 'Commercial grade credenza and integrated hospitality bar with integrated dual beverage coolers, acoustic fluted panelling, and hidden lockable storage drawers.',
    location: 'Collins St Corporate Suites, Melbourne',
    style: 'Commercial Modern',
    materials: ['High-Pressure Compact Laminate', 'Blackened Steel Trim', 'Dekton Stone Worktop'],
    hardware: 'Heavy Duty Commercial Grade Soft-Close with Keyed Master Locks',
    featured: false,
    year: '2024',
    dateAdded: '2024-09-05'
  },
  {
    id: 'cab-7',
    title: 'Japandi Light Ash Mudroom & Laundry Storage',
    category: 'custom',
    imageUrl: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1400&q=80',
    description: 'Dual-purpose high traffic mudroom and laundry with custom shoe cubbies, integrated laundry hamper pullouts, hanging rails, and overhead linen cupboards.',
    location: 'Cottesloe, Perth',
    style: 'Japandi Clean',
    materials: ['Light Ash Woodgrain Melamine', 'Finger-Jointed Oak Benchtop', 'White Powdercoat Hooks'],
    hardware: 'Integrated Soft-Close Laundry Pullout Hampers & Heavy-Duty Hooks',
    featured: false,
    year: '2025',
    dateAdded: '2025-02-01'
  },
  {
    id: 'cab-8',
    title: 'Matte Charcoal & Backlit Wine Cellar Display',
    category: 'custom',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=80',
    description: 'Climate-controlled glass wine display room featuring custom precision CNC-milled timber cradle racking, warm LED backlight washes, and tasting counter.',
    location: 'Adelaide Hills, SA',
    style: 'Luxe Hospitality',
    materials: ['Thermally Modified Dark Ash', 'Low-E Insulated Double Glass', 'Brushed Anodised Aluminium'],
    hardware: 'Heavy-Duty Pivot Hardware & Dimmable Smart LED Controllers',
    featured: true,
    year: '2024',
    dateAdded: '2024-12-18'
  }
];

export const CATEGORY_CONFIG = [
  { id: 'all', label: 'All Projects', icon: 'LayoutGrid' },
  { id: 'kitchen', label: 'Kitchens', icon: 'UtensilsCrossed' },
  { id: 'bathroom', label: 'Bathrooms & Vanities', icon: 'Bath' },
  { id: 'wardrobe', label: 'Wardrobes & Robes', icon: 'Shirt' },
  { id: 'living', label: 'Living & Media Walls', icon: 'Tv' },
  { id: 'commercial', label: 'Commercial Joinery', icon: 'Briefcase' },
  { id: 'custom', label: 'Custom & Cellars', icon: 'Sparkles' }
] as const;

export const SAMPLE_IMAGE_PRESETS = [
  {
    label: 'Modern Dark Timber Kitchen',
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
    style: 'Modern Minimalist',
    category: 'kitchen' as const
  },
  {
    label: 'Bright Shaker Kitchen',
    url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80',
    style: 'Hamptons Coastal',
    category: 'kitchen' as const
  },
  {
    label: 'Curved Wood Vanity',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80',
    style: 'Organic Modern',
    category: 'bathroom' as const
  },
  {
    label: 'Walk-In Wardrobe Suite',
    url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1400&q=80',
    style: 'Bespoke Luxury',
    category: 'wardrobe' as const
  },
  {
    label: 'Slat Wall Living Media Unit',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
    style: 'Contemporary Scandi',
    category: 'living' as const
  },
  {
    label: 'Glass Wine Storage Cellar',
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=80',
    style: 'Luxe Cellar',
    category: 'custom' as const
  }
];
