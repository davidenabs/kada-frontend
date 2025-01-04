import { KadaButton } from "@/components/form/button";
import { CloseIcon } from "@/icons";
import { IPost } from "@/interface/cms";
import { getTimeAgo } from "@/utils/utils";
import Image from "next/image";
import React, { Fragment } from "react";
import { cn, Drawer } from "rizzui";

type ExploreOpportunityDraewrProps = {
  close: () => void;
  open: boolean;
  data: IPost | null;
};

function ExploreOpportunityDraewr({
  close,
  open,
  data,
}: ExploreOpportunityDraewrProps) {
  return (
    <Fragment>
      <Drawer
        isOpen={open}
        onClose={() => {
          close();
        }}
        placement={"right"}
        size={"lg"}
        overlayClassName="bg-opacity-40 backdrop-blur-sm"
        containerClassName={cn("bg-gray-100 rounded-l-xl")}
        className="z-[9999]"
      >
        <section className="h-full bg-white">
          <div className="bg-[#F9F9F9] flex justify-between items-center px-6 py-5 rounded-tl-2xl border-b border-[#F2F2F2]">
            <h4 className="font-bold text-lg font-inter">
              Explore Opportunity
            </h4>

            <button onClick={close}>
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white px-6 p-6 h-full overflow-y-auto">
            <div className="flex gap-7 justify-items-stretch">
              <div className="relative w-[171px] h-[160px] rounded-xl overflow-hidden">
                <Image
                  src={"/images/bdo.png"}
                  fill
                  className="object-cover"
                  alt="Funding Opportunities for Farmers!"
                />
              </div>

              <div className="h-auto flex flex-col justify-between">
                <h4 className="text-sm font-semibold">
                  {data?.title || "United Nation’s Food Programme 2024"}
                </h4>

                <div className="">
                  <p className="text-[#676E77] text-xs">
                    {data?.shortDescription ??
                      "Share an exciting opportunity with your network"}
                  </p>

                  <p className="text-xs text-[#676E77] mt-2">
                    Posted {getTimeAgo(data?.createdAt ?? new Date())} ago
                  </p>
                </div>

                <KadaButton
                  className="w-fit rounded-full mt-4 !bg-[#00A551] !inline-flex"
                  onClick={() => {
                    window.open(data?.cta || "", "_blank");
                  }}
                >
                  Apply Now
                </KadaButton>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F8F8F8F8] px-3 py-7 space-y-4 mt-10 mb-20">
              <div dangerouslySetInnerHTML={{ __html: data?.content || "" }} />

              {/* <div className="">
                <h4 className="text-sm font-semibold">Program Details</h4>
                <p className="text-xs text-[#414346]">
                  The UNFP 2024 Grant is a unique opportunity aimed at
                  supporting innovative entrepreneurs focused on creating
                  solutions to food insecurity, sustainable agriculture, and
                  poverty alleviation. The program seeks individuals and
                  organizations with scalable projects capable of transforming
                  food systems and improving food accessibility worldwide.
                </p>
              </div>

              <div className="">
                <h4 className="text-sm font-semibold">Grant Value</h4>
                <p className="text-xs text-[#414346]">
                  Selected entrepreneurs may receive financial support,
                  mentorship, networking opportunities, and access to technical
                  resources. The grant amount and resources vary depending on
                  project needs and stage of development.
                </p>
              </div>

              <div className="">
                <h4 className="text-sm font-semibold">Eligibility Criteria</h4>
                <ul className="text-xs text-[#414346]">
                  <li>
                    Applicant Type: Individual entrepreneurs, start-ups, and
                    small to mid-sized businesses are eligible.
                  </li>
                  <li>
                    Focus Areas: Projects addressing food insecurity,
                    sustainable farming practices, supply chain improvements, or
                    other food-related issues.
                  </li>
                  <li>
                    Location: Open to entrepreneurs globally, with a particular
                    focus on projects targeting underserved and vulnerable
                    communities.
                  </li>
                  <li>
                    Development Stage: Early-stage projects with a working
                    prototype or pilot program, as well as mid-stage projects
                    ready to scale.
                  </li>
                  <li>
                    Impact Potential: Solutions should demonstrate a measurable
                    impact on food security, environmental sustainability, or
                    local economic growth.
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </section>
      </Drawer>
    </Fragment>
  );
}

export default ExploreOpportunityDraewr;
