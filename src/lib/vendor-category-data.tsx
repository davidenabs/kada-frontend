export const vendorProductServiceCategories = [
    "Crops",
    "Animal Products",
    "Organic Specialty",
    "Agricultural Services",
    "Livestock Services",
    "Land Management",
    "Processing Packaging",
    "Marketing Sales",
    "Tools Equipment",
    "Sustainable Solutions",
    "Financial Services",
    "Education Training",
    "Farm Infrastructure",
    "Technology Innovation",
];

export const productServiceCategories = vendorProductServiceCategories.map((value) => ({
    value: value,
    label: value,
}));
