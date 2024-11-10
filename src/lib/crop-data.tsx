export interface CropStage {
  name: string;
  duration: string;
  description: string;
  tasks: string[];
}

export interface CropSeason {
  name: string;
  period: string;
  isRecommended: boolean;
  activities: string[];
}

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
  seasons: CropSeason[];
  stages: CropStage[];
  idealTemperature: string;
  waterRequirements: string;
  soilType: string;
}

export const crops: Crop[] = [
  {
    id: "maize",
    name: "Maize",
    scientificName: "Zea mays",
    description: "A versatile grain crop that's a staple food in many regions.",
    imageUrl: "/crops/maize.jpg",
    seasons: [
      {
        name: "Main Season",
        period: "March-July",
        isRecommended: true,
        activities: [
          "Soil preparation and fertilization at the start of the season",
          "Planting and germination observed within the first two weeks",
          "Regular irrigation to support rapid vegetative growth",
          "Weed and pest control throughout, especially in the early stages",
          "Monitoring and maintaining crop health to maximize yield",
        ],
      },
      {
        name: "Second Season",
        period: "August-November",
        isRecommended: false,
        activities: [
          "Begin planting as early as August to avoid late rains",
          "Apply fertilizers in smaller quantities, given cooler conditions",
          "Monitor for diseases and pests that thrive in cooler temperatures",
          "Irrigation adjustments to accommodate changing rainfall patterns",
          "Prepare for harvest in November with drying methods for storage",
        ],
      },
    ],
    stages: [
      {
        name: "Seedling",
        duration: "0-2 weeks",
        description: "Initial growth phase after germination",
        tasks: [
          "Ensure soil moisture is maintained",
          "Monitor for pest damage",
          "Apply starter fertilizer",
        ],
      },
      {
        name: "Vegetative",
        duration: "3-8 weeks",
        description: "Rapid growth and leaf development",
        tasks: [
          "Side-dress with nitrogen",
          "Control weeds",
          "Monitor for foliar diseases",
        ],
      },
      {
        name: "Tasseling",
        duration: "9-10 weeks",
        description: "Pollen production and silk emergence",
        tasks: [
          "Ensure adequate irrigation",
          "Monitor for corn earworm",
          "Apply foliar fertilizer if needed",
        ],
      },
      {
        name: "Maturity",
        duration: "11-15 weeks",
        description: "Grain filling and drying",
        tasks: [
          "Reduce irrigation",
          "Monitor grain moisture",
          "Prepare for harvest",
        ],
      },
    ],
    idealTemperature: "20-30°C",
    waterRequirements: "500-800mm per season",
    soilType: "Well-drained loamy soil",
  },
  {
    id: "cassava",
    name: "Cassava",
    scientificName: "Manihot esculenta",
    description: "A drought-tolerant root crop with high starch content.",
    imageUrl: "/crops/cassava.jpg",
    seasons: [
      {
        name: "Early Planting",
        period: "January-March",
        isRecommended: true,
        activities: [
          "Prepare soil thoroughly for optimal root growth",
          "Plant cuttings at the correct angle for better root establishment",
          "Apply fertilizers to encourage early leaf development",
          "Monitor for early pests like cassava mealybugs",
          "Water management critical during dry periods for early root growth",
        ],
      },
      {
        name: "Late Planting",
        period: "September-November",
        isRecommended: false,
        activities: [
          "Planting as early as possible to catch last seasonal rains",
          "Apply pest control for common issues such as termites",
          "Use drought-resistant cuttings if available",
          "Reduced fertilizer application, focusing on root development",
          "Monitor for signs of root rot as rainy season concludes",
        ],
      },
    ],
    stages: [
      {
        name: "Establishment",
        duration: "0-4 weeks",
        description: "Stem cutting establishment and root initiation",
        tasks: [
          "Plant stem cuttings at correct angle",
          "Ensure soil contact",
          "Monitor soil moisture",
        ],
      },
      {
        name: "Leaf Development",
        duration: "1-3 months",
        description: "Canopy formation and tuber initiation",
        tasks: [
          "Control weeds",
          "Monitor for pests",
          "Apply fertilizer if needed",
        ],
      },
      {
        name: "Root Bulking",
        duration: "4-8 months",
        description: "Rapid tuber growth and starch accumulation",
        tasks: [
          "Maintain weed control",
          "Monitor for root rot",
          "Ensure adequate soil moisture",
        ],
      },
      {
        name: "Maturity",
        duration: "9-12 months",
        description: "Maximum root yield and starch content",
        tasks: [
          "Monitor tuber size",
          "Check for maturity signs",
          "Plan harvest timing",
        ],
      },
    ],
    idealTemperature: "25-35°C",
    waterRequirements: "1000-1500mm per year",
    soilType: "Sandy-loam to loamy soil",
  },
  {
    id: "rice",
    name: "Rice",
    scientificName: "Oryza sativa",
    description: "A major cereal crop grown in flooded conditions.",
    imageUrl: "/crops/rice.jpg",
    seasons: [
      {
        name: "Wet Season",
        period: "May-October",
        isRecommended: true,
        activities: [
          "Flood fields to prepare for transplanting",
          "Planting and seedling establishment",
          "Consistent water management for tillering and growth",
          "Fertilizer application based on growth stage",
          "Close monitoring for pests like brown planthopper during the season",
        ],
      },
      {
        name: "Dry Season",
        period: "November-April",
        isRecommended: false,
        activities: [
          "Use of drought-resistant varieties if planting in dry season",
          "Regular irrigation to replace lack of rain",
          "Adjust planting density to reduce evaporation",
          "Fertilizer and water management to support panicle development",
          "Prepare fields for harvest with early drainage",
        ],
      },
    ],
    stages: [
      {
        name: "Seedling",
        duration: "0-3 weeks",
        description: "Germination and early growth",
        tasks: [
          "Maintain water level",
          "Monitor seedling health",
          "Control weeds early",
        ],
      },
      {
        name: "Tillering",
        duration: "4-8 weeks",
        description: "Multiple stem development",
        tasks: [
          "Apply nitrogen fertilizer",
          "Maintain water depth",
          "Monitor for pests",
        ],
      },
      {
        name: "Panicle Development",
        duration: "9-12 weeks",
        description: "Reproductive stage and grain formation",
        tasks: [
          "Maintain consistent water level",
          "Apply protective sprays",
          "Monitor for diseases",
        ],
      },
      {
        name: "Ripening",
        duration: "13-16 weeks",
        description: "Grain filling and maturation",
        tasks: [
          "Prepare for drainage",
          "Monitor grain moisture",
          "Plan harvest timing",
        ],
      },
    ],
    idealTemperature: "20-35°C",
    waterRequirements: "1200-1600mm per season",
    soilType: "Clay or clay loam",
  },
];

export function searchCrops(query: string): Crop[] {
  const searchTerm = query.toLowerCase();
  return crops.filter(
    (crop) =>
      crop.name.toLowerCase().includes(searchTerm) ||
      crop.scientificName.toLowerCase().includes(searchTerm)
  );
}
