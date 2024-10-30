import { Inter, Oxygen, Raleway } from "next/font/google";
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
