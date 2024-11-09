export interface ICreateMarketPayload {
    name: string;
    address: string;
    localGovernmentArea: string;
    ward: string | null;
    coordinates: string; // Alternatively, you could split this into latitude and longitude as numbers
    size: 'Small' | 'Medium' | 'Large';
    openingDays: string; // Could also be an array of strings if individual days need to be accessed
    openingTime: string; // This could be a custom type if a structured time format is preferred
}

export interface IUploadProductsFromSheetPayload {
    file: File;
}
