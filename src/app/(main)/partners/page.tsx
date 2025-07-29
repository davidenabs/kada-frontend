"use client"
import { SearchIcon, UsersIcon } from "@/icons";
import { GlobeAltIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
// import { Search, Globe, Users, Award, Handshake } from "lucide-react";

export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const partners = [
    {
      name: "StarAgri",
      fullName: "Star Agri",
      logo: "/images/partners/startagri.jpeg",
      category: "international",
      description: "Leading the charge for agricultural transformation in Africa"
    },
     {
      name: "AGRA",
      fullName: "Alliance for a Green Revolution in Africa",
      logo: "/images/partners/AGRA.jpg",
      category: "international",
      description: "Leading the charge for agricultural transformation in Africa"
    },
    {
      name: "Gain",
      fullName: "Global Alliance for Improved Nutrition",
      logo: "/images/partners/Gain.jpg",
      category: "international",
      description: "Working to improve nutrition and health outcomes"
    },
    {
      name: "GIZ",
      fullName: "Deutsche Gesellschaft für Internationale Zusammenarbeit",
      logo: "/images/partners/Giz.jpg",
      category: "international",
      description: "German development cooperation organization"
    },
    {
      name: "Synergos",
      fullName: "Synergos Institute",
      logo: "/images/partners/Synergos.jpg",
      category: "international",
      description: "Bridging social divides to reduce poverty and increase equity"
    },
    {
      name: "EAST-WEST",
      fullName: "East-West Seed Company",
      logo: "/images/partners/EAST-WEST.jpg",
      category: "private",
      description: "Leading vegetable seed company in tropical Asia"
    },
    {
      name: "Exaf",
      fullName: "Export Agricultural Foundation",
      logo: "/images/partners/Exaf.jpg",
      category: "local",
      description: "Supporting agricultural export development"
    },
    {
      name: "OCP",
      fullName: "OCP Africa",
      logo: "/images/partners/OCP.jpg",
      category: "private",
      description: "Leading phosphate and fertilizer producer"
    },
    {
      name: "ANRIN",
      fullName: "Agricultural Network Research Institute Nigeria",
      logo: "/images/partners/ANRIN.jpg",
      category: "research",
      description: "Agricultural research and development network"
    },
    {
      name: "Mercy Corps",
      fullName: "Mercy Corps",
      logo: "/images/partners/Mercy.jpg",
      category: "international",
      description: "Global humanitarian organization"
    },
    {
      name: "WOFAN",
      fullName: "Women Farmers Advancement Network",
      logo: "/images/partners/WOFAN.jpg",
      category: "local",
      description: "Empowering women in agriculture"
    },
    {
      name: "SAA",
      fullName: "Sasakawa Africa Association",
      logo: "/images/partners/SAA.jpg",
      category: "international",
      description: "Promoting agricultural development in Africa"
    },
    {
      name: "Harvest Plus",
      fullName: "HarvestPlus",
      logo: "/images/partners/Harvest.jpg",
      category: "research",
      description: "Breeding and delivering biofortified crops"
    },
    {
      name: "Feed the Future",
      fullName: "Feed the Future Initiative",
      logo: "/images/partners/Feedthefuture.jpg",
      category: "government",
      description: "U.S. Government's global hunger and food security initiative"
    },
    {
      name: "IITA",
      fullName: "International Institute of Tropical Agriculture",
      logo: "/images/partners/IITA.jpg",
      category: "research",
      description: "Leading tropical agriculture research institute"
    },
    {
      name: "National Center of Agriculture",
      fullName: "National Center of Agriculture",
      logo: "/images/partners/National center of Agric.jpg",
      category: "government",
      description: "National agricultural development center"
    },
    {
      name: "Institute of Agriculture",
      fullName: "Institute of Agriculture",
      logo: "/images/partners/Institute of Agric.jpg",
      category: "research",
      description: "Agricultural research and education institute"
    },
    {
      name: "NAERLS",
      fullName: "National Agricultural Extension and Research Liaison Services",
      logo: "/images/partners/NAERLS.jpg",
      category: "government",
      description: "Agricultural extension and research coordination"
    },
    {
      name: "IRRI",
      fullName: "International Rice Research Institute",
      logo: "/images/partners/IRRI.jpg",
      category: "research",
      description: "Premier rice research institute"
    },
    {
      name: "Juriya",
      fullName: "Juriya Agricultural Development",
      logo: "/images/partners/Juriya.jpg",
      category: "local",
      description: "Local agricultural development organization"
    },
    {
      name: "Department of Agriculture",
      fullName: "Department of Agriculture",
      logo: "/images/partners/Department of Agric.jpg",
      category: "government",
      description: "Government agricultural department"
    },
    {
      name: "FAO",
      fullName: "Food and Agriculture Organization",
      logo: "/images/partners/FAO.jpg",
      category: "international",
      description: "UN agency leading international efforts to defeat hunger"
    },
    {
      name: "USAID",
      fullName: "United States Agency for International Development",
      logo: "/images/partners/USAID.jpg",
      category: "government",
      description: "U.S. government agency for international development"
    }
  ];

  const categories: any[] = [
    // { id: "all", name: "All Partners", icon: Users },
    // { id: "international", name: "International", icon: Globe },
    // { id: "government", name: "Government", icon: Award },
    // { id: "research", name: "Research", icon: Search },
    // { id: "private", name: "Private Sector", icon: Handshake },
    // { id: "local", name: "Local Organizations", icon: Users }
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || partner.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return partners.length;
    return partners.filter(p => p.category === categoryId).length;
  };

  return (
    <main className="bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      {/* Header Section */}
      <div className="flex overflow-hidden flex-col pt-[173px] md:pt-[135px] pb-10">
        <div className="relative w-full max-md:hidden">
          <img
            src={"/images/header-banner.png"}
            alt={"alt"}
            className="object-contain w-full aspect-[7.41] max-md:max-w-full"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center md:-mt-[150px] relative z-10">
          <h1 className="text-4xl md:text-5xl text-primary md:text-white font-bold mb-4">
            Our Strategic Partners
          </h1>
          <p className="text-lg md:text-xl text-primary md:text-white opacity-90 max-w-3xl mx-auto">
            Collaborating with leading organizations worldwide to drive agricultural transformation and rural development
          </p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-12">


        {/* Partners Grid */}
        {filteredPartners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPartners.map((partner, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                <div className="p-6">
                  {/* Logo Container */}
                  <div className="mb-4 flex items-center justify-center h-24 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors duration-300">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e: any) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-xl">
                      <span className="text-2xl font-bold text-blue-600">
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                      {partner.name}
                    </h3>
                    {/* <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                      {partner.fullName}
                    </p>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                      {partner.description}
                    </p> */}

                    {/* Category Badge */}
                    {/* <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${partner.category === 'international' ? 'bg-blue-100 text-blue-800' :
                      partner.category === 'government' ? 'bg-green-100 text-green-800' :
                        partner.category === 'research' ? 'bg-purple-100 text-purple-800' :
                          partner.category === 'private' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                      }`}>
                      {categories.find(cat => cat.id === partner.category)?.name || partner.category}
                    </span> */}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">

            <h3 className="text-xl font-semibold text-gray-800 mb-2">No partners found</h3>
            <p className="text-gray-600 mb-4">
              {/* Try adjusting your search terms or filters */}
            </p>

          </div>
        )}

      </div>
    </main>
  );
}