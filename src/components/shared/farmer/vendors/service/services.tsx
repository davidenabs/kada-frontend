import Catalog from "@/components/common/catalog";
import CatalogSkeleton from "@/components/skeletons/catalog";
import { ICatalog } from "@/interface/catalog";
import React from "react";
import { Empty } from "rizzui";

type ServicesProps = {
  products: ICatalog[];
  activeTab: "products" | "services";
  loading?: boolean;
  isError?: boolean;
};

function Services({
  products,
  activeTab,
  loading = false,
  isError = false,
}: ServicesProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-bold text-lg font-inter">Our {activeTab}</h4>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <CatalogSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="">error...</div>
      ) : products.length === 0 ? (
        <Empty text="No products available" />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {products?.map((product) => (
            <Catalog
              type={product.type}
              image={product.imagePath ?? "/images/bdo.png"}
              name={product.name}
              price={product.amount}
              description={product.description}
              key={product.id + product.name + product.amount}
            />
          ))}
        </div>
      )}

      {/* <Catalog
          type="service"
          image="/images/bdo.png"
          name="HarvestPeak Fertilizers"
          price="10,000"
        /> */}
    </div>
  );
}

export default Services;
