// Interface for LGA
export interface KadaLGA {
    state: string;
    lgas: string[]; // Flat list of LGAs
    zones: Record<string, string[]>; // LGAs grouped by zones
}

// Define the KadaLGA instance
export const kadaLGA: KadaLGA = {
    state: "Kaduna",
    lgas: [
        "Birnin Gwari",
        "Chikun",
        "Giwa",
        "Igabi",
        "Ikara",
        "Jaba",
        "Jema’a",
        "Kachia",
        "Kaduna North",
        "Kaduna South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon Gari",
        "Sanga",
        "Soba",
        "Zangon Kataf",
        "Zaria"
    ],
    zones: {
        "Birnin Gwari Zone": [
            "Birnin Gwari",
            "Chikun",
            "Kaduna South",
            "Kaduna North",
            "Kajuru"
        ],
        "Lere Zone": [
            "Lere",
            "Kauru",
            "Igabi"
        ],
        "Maigana Zone": [
            "Sabon Gari",
            "Zaria",
            "Soba",
            "Kubau",
            "Ikara",
            "Makarfi",
            "Giwa",
            "Kudan"
        ],
        "Samaru Zone": [
            "Zangon Kataf",
            "Kaura",
            "Jema’a",
            "Kachia",
            "Jaba",
            "Sanga",
            "Kagarko"
        ]
    }
};
