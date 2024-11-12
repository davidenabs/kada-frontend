import React from "react";
import CooperativeProfileSharedPage from "@/components/shared/cooperative/profile";
import { generateCooperativeMetadata } from "@/app/_templates/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return generateCooperativeMetadata({
    title: "Profile",
    description: "Profile",
  });
}

export default function CooperativeProfilePage() {
  return <CooperativeProfileSharedPage />;
}
