// Interface for LGA
export interface KadaLGA {
  state: string;
  lgas: string[]; // Flat list of LGAs
  zones: Record<string, string[]>; // LGAs grouped by zones
  wards: Record<string, string[]>; // Wards grouped by LGAs
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
    "Zaria",
  ],
  zones: {
    "Birnin Gwari Zone": [
      "Birnin Gwari",
      "Chikun",
      "Kaduna South",
      "Kaduna North",
      "Kajuru",
    ],
    "Lere Zone": ["Lere", "Kauru", "Igabi"],
    "Maigana Zone": [
      "Sabon Gari",
      "Zaria",
      "Soba",
      "Kubau",
      "Ikara",
      "Makarfi",
      "Giwa",
      "Kudan",
    ],
    "Samaru Zone": [
      "Zangon Kataf",
      "Kaura",
      "Jema’a",
      "Kachia",
      "Jaba",
      "Sanga",
      "Kagarko",
    ],
  },
  "wards": {
    "Birnin Gwari": [
      "Dogon Dawa",
      "Gayam",
      "Kakangi",
      "Kazage",
      "Kutemesi",
      "Kuyelo",
      "Magajin Gari I",
      "Magajin Gari II",
      "Magajin Gari III",
      "Randagi",
      "Tabanni"
    ],
    "Chikun": [
      "Chikun",
      "Gwagwada",
      "Kakau",
      "Kujama",
      "Kunai",
      "Kuriga",
      "Narayi",
      "Nassarawa"
    ],
    "Giwa": [
      "Giwa",
      "Danmahawayi",
      "Idasu",
      "Pan Hauya",
      "Galadimawa",
      "Kadage",
      "Shika",
      "Gangara",
      "Kakangi",
      "Kidandan",
      "Yakawada"
    ],
    "Igabi": [
      "Afaka",
      "Birnin Yero",
      "Gadan Gayan",
      "Gwaraji",
      "Igabi",
      "Kerawa",
      "Kwarau",
      "Rigachikun",
      "Rigasa",
      "Sabon Birnin Daji",
      "Turunku",
      "Zangon Aya"
    ],
    "Jaba": [
      "Chori",
      "Daddu",
      "Dura Bitaro",
      "Fada",
      "Fai",
      "Nduya",
      "Nok",
      "Sabchem",
      "Sabzuro",
      "Samban"
    ],
    "Jama'a": [
      "Asso",
      "Atuku",
      "Barde",
      "Gidan Waya",
      "Godogodo",
      "Jagindi",
      "Kafanchan A",
      "Kafanchan B",
      "Kagoma (Gwong)",
      "Kaninkon (Nikyob)",
      "Maigizo (Kadajya)",
      "Takau"
    ],
    "Kachia": [
      "Agunu",
      "Ankwa",
      "Awon",
      "Bishini",
      "Dokwa",
      "Gidan Tagwai",
      "Gumel",
      "Kachia (Akhwee)",
      "Kateri (Anumafa)",
      "Kurmin Musa",
      "Kwaturu",
      "Sabon Sarki (Ghiing)"
    ],
    "Kaduna North": [
      "Badarawa",
      "Dadi Riba",
      "Hayin Banki",
      "Kabala",
      "Kawo",
      "Maiburiji",
      "Sardauna",
      "Shaba",
      "Unguwan Dosa",
      "Unguwar Rimi",
      "Unguwar Sarki",
      "Unguwar Shanu",
      "Unguwar Kanawa"
    ],
    "Kaduna South": [
      "Badiko",
      "Barnawa",
      "Kakuri Gwari",
      "Kakuri Hausa",
      "Makera",
      "Sabon Gari North",
      "Sabon Gari South",
      "Television",
      "Tudun Nupawa",
      "Tudun Wada North",
      "Tudun Wada South",
      "Tudun Wada West",
      "Unguwan Sanusi"
    ],
    "Kagarko": [
      "Aribi",
      "Iddah",
      "Jere North",
      "Jere South",
      "Kagarko North",
      "Kagarko South",
      "Katugal (Ator)",
      "Kukui",
      "Kurmin Jibrin (Kosheng)",
      "Kushe"
    ],
    "Kajuru": [
      "Afogo",
      "Buda",
      "Idon",
      "Kajuru",
      "Kallah",
      "Kasuwan Magani",
      "Kufana",
      "Maro",
      "Rimau",
      "Tantattu"
    ],
    "Kaura": [
      "Agban",
      "Bondong (Gbandang)",
      "Fada (Ucyio)",
      "Kadarko",
      "Kaura (Watyap)",
      "Kpak",
      "Kukum",
      "Malagum (Zali)",
      "Manchok (Tsok)",
      "Zankan"
    ],
    "Kauru": [
      "Badurum",
      "Bital",
      "Damakasuwa",
      "Dawaki",
      "Geshere",
      "Kamaru",
      "Kauru East",
      "Kauru West",
      "Kwassam",
      "Makami",
      "Pari"
    ],
    "Ikara": [
      "Ikara",
      "Janfala",
      "K/kogi",
      "Saulawa",
      "Pala",
      "Saya-saya",
      "Auchan",
      "Rumi",
      "Paki",
      "Kuya"
    ],
    "Kubau": [
      "Anchau",
      "Pampegua",
      "Zuntu",
      "Dutsen-wai",
      "Damau",
      "Kargi",
      "Karreh",
      "Mah",
      "Kubau",
      "Haskiya",
      "Zabi"
    ],
    "Kudan": [
      "Doka",
      "Garu",
      "Hunkuyi",
      "Kauran Wali North",
      "Kauran Wali South",
      "Kudan",
      "Likoro",
      "Sabon Garin Hunkuyi",
      "Taban Sani",
      "Zabi"
    ],
    "Lere": [
      "Abadawa",
      "Dan Alhaji",
      "Garu Mariri",
      "Gure Kahugu (Gbiri Niragu)",
      "Kayarda",
      "Kudaru",
      "Lazuru Tuddai",
      "Lere",
      "Raminkura",
      "Sabon Birni",
      "Saminaka"
    ],
    "Makarfi": [
      "Makarfi",
      "Tudun Wada",
      "Gazara",
      "Danguziri",
      "Gimi",
      "Nasarawan Doya",
      "Mayere",
      "Gubuchi",
      "Gwanki",
      "Dandamisa"
    ],
    "Sabon Gari": [
      "Samaru",
      "Basawa",
      "Bomo",
      "Jama'a",
      "Chikaji",
      "Dogarawa",
      "Hanwa",
      "Jushin Waje",
      "Muchia",
      "Unguwan Gabas",
      "Zabi"
    ],
    "Sanga": [
      "Wasa Station",
      "Arak",
      "Nandu",
      "Gwantu",
      "Ninzam North",
      "Ninzam South",
      "Ninzam West",
      "Ayu",
      "Bokana",
      "Aboro",
      "Fadan Karshi"
    ],
    "Soba": [
      "Maigana",
      "Kinkiba",
      "Gimba",
      "Kwassallo",
      "Richifa",
      "Gamagira",
      "Dan wata",
      "Turawa",
      "Soba",
      "Garun gwanki",
      "Rahama"
    ],
    "Zangon Kataf": [
      "Atak Nfang (H. Zaman Dabo)",
      "Gidan Jatau",
      "Ikulu (Bakulu)",
      "Jei (H. Unguwar Gaya)",
      "Kamantan (Anghan)",
      "Kanai (H. Gora)",
      "Madakiya (J. Bata̱don)",
      "Unguwar Rimi (J. Za̱nta̱ra̱kpat)",
      "Zango Urban (T. Nietcen-A̱fakan)",
      "Zonkwa",
      "Zonzon"
    ],
    "Zaria": [
      "Kwarbai 'a'",
      "Kwarbai 'b'",
      "Ung. Juma",
      "Limancin-kona",
      "Kaura",
      "Tudun wada",
      "Gyallesu",
      "Ung. Fatika",
      "Tukur tukur",
      "Dambo",
      "Wucicciri",
      "Dutsen abba",
      "Kufena"
    ]
  }
};

// Map LGAs to options
export const lgaOptions = kadaLGA.lgas.map((lga) => ({
  value: lga,
  label: lga,
}));

// Map Zones to options
export const zoneOptions = Object.keys(kadaLGA.zones).map((zone) => ({
  value: zone,
  label: zone,
}));

// Map LGAs to options
export const lgaOptionsByZone = (zone: string) =>
  kadaLGA.zones[zone].map((lga) => ({
    value: lga,
    label: lga,
  }));

export const wardOptionsByLga = (lga: string) => {
  if (!kadaLGA.wards[lga]) return [];
  return kadaLGA.wards[lga].map((ward) => ({
    value: ward,
    label: ward,
  }));
};
