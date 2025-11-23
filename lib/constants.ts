export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const ITEMS_PER_PAGE = 4;

export const BODY_TYPES = [
  { value: "panelTruck", label: "Van" },
  { value: "fullyIntegrated", label: "Fully Integrated" },
  { value: "alcove", label: "Alcove" },
];

export const EQUIPMENT_OPTIONS = [
  { key: "AC" as const, label: "AC" },
  { key: "transmission" as const, label: "Automatic", value: "automatic" },
  { key: "kitchen" as const, label: "Kitchen" },
  { key: "TV" as const, label: "TV" },
  { key: "bathroom" as const, label: "Bathroom" },
];

export const FEATURE_LABELS: Record<string, string> = {
  transmission: "Transmission",
  engine: "Engine",
  AC: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  TV: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

export const DETAIL_LABELS: Record<string, string> = {
  form: "Form",
  length: "Length",
  width: "Width",
  height: "Height",
  tank: "Tank",
  consumption: "Consumption",
};
