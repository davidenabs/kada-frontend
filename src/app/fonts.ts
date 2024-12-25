import {
  Inter,
  JetBrains_Mono,
  Lora,
  Oxygen,
  Playfair_Display,
  Raleway,
  Space_Grotesk,
} from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
});

export const oxygen = Oxygen({
  weight: ["300", "400", "700"],
  variable: "--oxygen",
  subsets: ["latin"],
});

export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--raleway",
});

export const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});
