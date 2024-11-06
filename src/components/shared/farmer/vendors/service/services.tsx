import Catalog from "@/components/common/catalog";
import React from "react";

function Services() {
  return (
    <div className="space-y-4">
      <h4 className="font-bold text-lg font-inter">Our services</h4>

      <div className="grid md:grid-cols-2 gap-6">
        <Catalog
          type="service"
          image="/images/bdo.png"
          name="HarvestPeak Fertilizers"
          price="10,000"
        />

        <Catalog
          type="service"
          image="/images/bdo.png"
          name="HarvestPeak Fertilizers"
          price="10,000"
        />
      </div>
    </div>
  );
}

export default Services;
