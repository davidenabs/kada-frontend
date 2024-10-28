"use client";
import Footer from "@/components/main/footer";
import Navbar from "@/components/main/navbar";
import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
