import { Metadata } from "next";

export const baseMetadata: Metadata = {
  title: {
    default: "Kada",
    template: "%s | Kada",
  },
  description:
    "Transforming Kaduna through Food Security and National Development",
  openGraph: {
    title: "Kada",
    description:
      "Transforming Kaduna through Food Security and National Development",
    // images: ["/og-image.jpg"],
  },
};

export const cooperativeDashboardMetadata: Metadata = {
  title: {
    default: "Cooperative Dashboard",
    template: "%s | Cooperative Dashboard | Kada",
  },
  description: "Cooperative Dashboard",
  openGraph: {
    ...baseMetadata.openGraph,
  },
};

export function generateCooperativeMetadata(cooperative: {
  title: string;
  description?: string;
}): Metadata {
  return {
    ...cooperativeDashboardMetadata,
    title: cooperative.title,
    description:
      cooperative.description ?? cooperativeDashboardMetadata.description,
    openGraph: {
      ...baseMetadata.openGraph,
      title: cooperative.title,
      description:
        cooperative.description ??
        cooperativeDashboardMetadata?.openGraph?.description,
    },
  };
}

export const farmerDashboardMetadata: Metadata = {
  ...baseMetadata,
  title: {
    default: "Farmer Dashboard",
    template: "%s | Farmer Dashboard | Kada",
  },
  description: "Farmer Dashboard",
  openGraph: {
    ...baseMetadata.openGraph,
  },
};

export function generateProductMetadata(product: {
  name: string;
  description: string;
}): Metadata {
  return {
    ...baseMetadata,
    title: product.name,
    description: product.description,
    openGraph: {
      ...baseMetadata.openGraph,
      title: product.name,
      description: product.description,
    },
  };
}
