import Catalog from "@/components/common/catalog";
import { ICatalog } from "@/interface/catalog";
import React from "react";

type ServicesProps = {
  products: ICatalog[];
};

function Services({ products }: ServicesProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-bold text-lg font-inter">Our services</h4>

      <div className="grid md:grid-cols-2 gap-6">
        {products?.map((product) => (
          <Catalog
            type={product.type}
            image="/images/bdo.png"
            name={product.name}
            price={product.amount}
          />
        ))}

        {/* <Catalog
          type="service"
          image="/images/bdo.png"
          name="HarvestPeak Fertilizers"
          price="10,000"
        /> */}
      </div>
    </div>
  );
}

export default Services;
