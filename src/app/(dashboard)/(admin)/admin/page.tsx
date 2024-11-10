import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function Admin() {
  return redirect("/admin/dashboard");
}
