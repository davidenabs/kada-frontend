import { Metadata } from "next";

export const baseMetadata: Metadata = {
  title: {
    default: "Kada",
    template: "%s | Kada",
  },
  description:
    "Transforming Kaduna through Food Security and National Development",
  openGraph: {
    type: "website",
    siteName: "Kada",
    title: "Kada",
    description:
      "Transforming Kaduna through Food Security and National Development",
    // images: [
    //   {
    //     url: "/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Kada - Food Security and National Development",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@KadaOfficial",
    creator: "@KadaOfficial",
  },
};
