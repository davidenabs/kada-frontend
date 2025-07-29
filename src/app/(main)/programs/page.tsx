"use client"
import { CalendarDateRangeIcon, ChevronDownIcon, ChevronUpIcon, SwatchIcon, UsersIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
// import { ChevronDown, ChevronUp, Calendar, Users, Target, MapPin } from "lucide-react";

export default function ProgramsPage() {
  const [expandedProgram, setExpandedProgram] = useState(null);

  const programs = [
    {
      id: 1,
      title: "Community-Based Agricultural and Rural Development Project (CBARDP)",
      duration: "2006 - 2012",
      description: "A strategic development initiative aimed at improving the livelihoods of rural communities. The project focuses on increasing agricultural productivity, alleviating poverty, and enhancing access to essential rural infrastructure.",
      objectives: [
        "Increasing agricultural productivity",
        "Alleviating poverty",
        "Enhancing access to essential rural infrastructure",
        "Promoting sustainable agricultural practices",
        "Facilitating income-generating activities",
        "Improving basic amenities (water supply, feeder roads, health facilities)"
      ],
      approach: "Community participation and needs-driven interventions"
    },
    {
      id: 2,
      title: "Root and Tuber Expansion Programme (RTEP)",
      duration: "2004 - 2011",
      description: "An agricultural development initiative assisted by IFAD and jointly funded by the Federal Government of Nigeria and participating states, including Kaduna State.",
      objectives: [
        "Enhance production and value chain development of root and tuber crops",
        "Improve food security",
        "Increase rural incomes",
        "Promote sustainable agricultural practices among smallholder farmers"
      ],
      funding: "IFAD, Federal Government of Nigeria, and participating states"
    },
    {
      id: 3,
      title: "National Programme for Food Security (NPFS)",
      duration: "2006 - 2010",
      description: "A collaborative initiative to enhance food security through improved access to irrigation, primarily by constructing new small earth dams across the state.",
      objectives: [
        "Enhance food security through improved irrigation access",
        "Support year-round agricultural activities",
        "Boost crop yields",
        "Improve livelihoods of rural farming communities"
      ],
      funding: "Arab Bank for Economic Development in Africa (BADEA), Federal Government of Nigeria, Kaduna State Government"
    },
    {
      id: 4,
      title: "FADAMA Development Programme",
      duration: "1996 - 2019",
      description: "A multi-phase programme that evolved through four distinct phases, each building upon the achievements of its predecessor.",
      phases: [
        {
          name: "FADAMA I Project",
          duration: "1996-1998",
          focus: "Development of FADAMA lands through small-scale irrigation systems"
        },
        {
          name: "FADAMA II Project",
          duration: "2004-2009",
          focus: "Sustainably increase income of FADAMA users through better resource utilization"
        },
        {
          name: "FADAMA III Project",
          duration: "2008-2009",
          focus: "Consolidate gains and empower rural land and water resource users"
        },
        {
          name: "FADAMA III Additional Financing",
          duration: "2013-2019",
          focus: "Production of priority crops including tomato and sorghum"
        }
      ]
    },
    {
      id: 5,
      title: "Nigeria COVID-19 Action Recovery and Economic Stimulus (NG-CARES)",
      duration: "2020 - 2021",
      description: "Initiative to expand access to livelihood support, food security services, and grants for poor and vulnerable households.",
      components: [
        "Provision of agricultural inputs",
        "Support for agricultural production assets",
        "Provision of agricultural processing assets"
      ]
    },
    {
      id: 6,
      title: "Commercial Agricultural Development Project (CADP)",
      duration: "2009 - 2016",
      description: "A World Bank-assisted project designed to strengthen agricultural production systems and improve market access for targeted value chains among small- and medium-scale commercial farmers.",
      extension: "Extended from December 2014 to December 2016"
    },
    {
      id: 7,
      title: "West African Agricultural Productivity Programme (WAAPP)",
      duration: "2012 - 2016",
      description: "A regional ECOWAS initiative supported by the World Bank, aimed at increasing agricultural productivity and sustainability through agricultural innovations.",
      valueChains: ["Maize", "Sorghum", "Aquaculture", "Mango/Fruit", "Fly control"],
      commenced: "February 2014"
    },
    {
      id: 8,
      title: "Multi National NERICA Rice Dissemination Project (MNRDP)",
      duration: "2005 - 2010",
      description: "Implemented in seven West African countries including Nigeria, focusing on upland rice production ecologies.",
      scope: "Six states in Nigeria, including Kaduna State"
    },
    {
      id: 9,
      title: "Other Collaborative Programmes",
      duration: "Ongoing",
      description: "KADP/KADA partnerships with national and international development agencies.",
      partners: [
        "GIZ (Deutsche Gesellschaft für Internationale Zusammenarbeit)",
        "OCP Africa",
        "AGRA (Alliance for a Green Revolution in Africa)",
        "BNTF (Basic Needs Trust Fund)",
        "SYNERGOS"
      ]
    },
    {
      id: 10,
      title: "Agro-Processing, Productivity Enhancement & Livelihood Improvement Support (APPEALS) Project",
      duration: "Seven-year initiative",
      description: "A Federal Ministry of Agriculture and Rural Development initiative in collaboration with the World Bank and other stakeholders.",
      objectives: [
        "Build on the legacy of the Agricultural Transformation Agenda (ATA)",
        "Promote food security",
        "Support local education and job creation",
        "Enhance economic diversification through value chain development"
      ]
    }
  ];

  const toggleProgram = (id: any) => {
    setExpandedProgram(expandedProgram === id ? null : id);
  };

  return (
    <main className="bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      {/* Header Section className="bg-primary-400/20" */}
      {/* <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Agricultural Development Programmes</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Comprehensive initiatives driving agricultural transformation and rural development in Kaduna State
          </p>
        </div>
      </div> */}

      <div className="flex overflow-hidden flex-col pt-[273px] md:pt-[135px]">
        <div className="relative w-full max-md:hidden">
          <img
            src={"/images/header-banner.png"}
            alt={"alt"}
            className="object-contain w-full aspect-[7.41] max-md:max-w-full"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center -mt-[150px] relative z-10">
          <h1 className="text-4xl md:text-5xl text-primary md:text-white font-bold mb-4">
            Agricultural Development Programmes
          </h1>
          <p className="text-lg md:text-xl text-primary md:text-white opacity-90 max-w-3xl mx-auto">
            Comprehensive initiatives driving agricultural transformation and rural development in Kaduna State
          </p>
        </div>
      </div>


      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 mt-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-800 mb-2">10</div>
            <div className="text-gray-600">Active Programmes</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-800 mb-2">25+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-800 mb-2">Multiple</div>
            <div className="text-gray-600">Value Chains</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-800 mb-2">Rural</div>
            <div className="text-gray-600">Communities</div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Development Programmes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of agricultural development initiatives designed to transform rural communities and enhance food security
          </p>
        </div>

        <div className="space-y-6">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleProgram(program.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        #{program.id}
                      </div>
                      {program.duration && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <CalendarDateRangeIcon className="w-4 h-4" />
                          <span className="text-sm">{program.duration}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {expandedProgram === program.id ? (
                      <ChevronUpIcon className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {expandedProgram === program.id && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-6 space-y-6">

                    {program.objectives && (
                      <div>
                        <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                          {/* <TargetIcon className="w-5 h-5 text-green-600" /> */}
                          Key Objectives
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {program.objectives.map((objective, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {program.phases && (
                      <div>
                        <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                          <CalendarDateRangeIcon className="w-5 h-5 text-green-600" />
                          Programme Phases
                        </h4>
                        <div className="space-y-3">
                          {program.phases.map((phase, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-semibold text-gray-800">{phase.name}</h5>
                                <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
                                  {phase.duration}
                                </span>
                              </div>
                              <p className="text-gray-700">{phase.focus}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {program.components && (
                      <div>
                        <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                          <UsersIcon className="w-5 h-5 text-green-600" />
                          Programme Components
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {program.components.map((component, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{component}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {program.valueChains && (
                      <div>
                        <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                          <SwatchIcon className="w-5 h-5 text-green-600" />
                          Priority Value Chains
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {program.valueChains.map((chain, index) => (
                            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {chain}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {program.partners && (
                      <div>
                        <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                          <UsersIcon className="w-5 h-5 text-green-600" />
                          Partner Organizations
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {program.partners.map((partner, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{partner}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {program.funding && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Funding Partners</h4>
                        <p className="text-gray-700">{program.funding}</p>
                      </div>
                    )}

                    {program.approach && (
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Implementation Approach</h4>
                        <p className="text-gray-700">{program.approach}</p>
                      </div>
                    )}

                    {(program.extension || program.commenced || program.scope) && (
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Additional Information</h4>
                        {program.extension && <p className="text-gray-700 mb-1">Extension: {program.extension}</p>}
                        {program.commenced && <p className="text-gray-700 mb-1">Commenced: {program.commenced}</p>}
                        {program.scope && <p className="text-gray-700">Scope: {program.scope}</p>}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      {/* <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Agricultural Transformation</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Be part of our mission to enhance agricultural productivity, improve food security, and transform rural communities across Kaduna State.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Learn More
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div> */}
    </main>
  );
}