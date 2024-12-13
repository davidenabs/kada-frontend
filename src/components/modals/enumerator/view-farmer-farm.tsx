"use client";
import { IFarm } from "@/interface/farm";
import { IUser } from "@/interface/user";
import React from "react";
import FarmerData from "./data/farmer";
import FarmData from "./data/farm";
import { CloseIcon } from "@/icons";


type ViewFarmerFarmModalProps = {
    close: () => void;
    item: IUser | IFarm;
    activeTab: "Farmers" | "Farms";
};

const ViewFarmerFarmModal = ({ close, item, activeTab }: ViewFarmerFarmModalProps) => {
    return (

        <div
        className="flex overflow-hidden flex-col w-full rounded-[10px] bg-white font-inter"
    >
        <header className="flex items-center justify-between border-b px-6 py-4 bg-[#F9F9F9]">
            <div className="flex flex-col">
                <h4 className="text-base font-semibold">{activeTab == "Farmers" ? "Farmers" : "Farms"} Details</h4>
            </div>

            <button onClick={close}>
                <CloseIcon className="w-4 h-4" />
            </button>
        </header>

        {/* Modal Body */}
        <div className="bg-white p-6 divide-y">
        {activeTab === "Farmers" ? (
                <FarmerData profile={item as IUser} close={close} />
            ) : (
                <FarmData farm={item as IFarm} close={close} />
            )}
        </div>
    </div>

        // <div className="modal-container">
        //     <button onClick={close} className="close-button">Close</button>
           
        // </div>
    );
};

export default ViewFarmerFarmModal;


// "use client";
// import React from "react";
// import { CloseIcon } from "@/icons";
// import { toast } from "sonner";
// import { IUser } from "@/interface/user";
// import { IFarm } from "@/interface/farm";
// import { isValidValue } from "@/utils/utils";
// import { KadaButton } from "@/components/form/button";
// import Link from "next/link";
// import Input from "@/components/form/input";
// import { useVerifyNinMutation } from "@/app/_api/user";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { nimcVwrifySchema, nimcVwrifySchemaType } from "@/schema/user";
// import { useGetFarmQuery, useUpdateFarmMutation, useVerifyFarmMutation } from "@/app/_api/farm";
// import { CoordinateDisplay } from "@/components/dashboards/farmer/farm-info";
// import Image from "next/image";
// import { Map } from "@/components/common/map";

// type ViewFarmerFarmModalProps = {
//     close: () => void;
//     item: IUser | IFarm;
//     activeTab: "Farmers" | "Farms";
// };

// const farmerData = (profile: IUser, close: () => void) => {

//     if (!profile) return <div>No farmer details available.</div>;

//     const ninData = profile?.farmerProfile?.ninData;

//     const { mutateAsync, isPending } = useVerifyNinMutation();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//     } = useForm({
//         defaultValues: {
//             dob: "",
//             nin: "",
//             userId: `${profile?.id}`,
//             phoneNumber: `${profile?.phoneNumber}`,
//         },
//         resolver: zodResolver(nimcVwrifySchema),
//     });

//     const onSubmit = (data: nimcVwrifySchemaType) => {
//         mutateAsync(data, {
//             onSuccess: (response) => {
//                 if (response.success) {
//                     toast.success("User NIN verification was successful");
//                     close();
//                     // refresh the widows
//                     window.location.reload();
//                 } else {
//                     toast.error("Invalid OTP");
//                 }
//             },
//             onError: (error) => { },
//         });
//     };

//     return (
//         <div className="w-full max-h-[70vh] overflow-y-scroll p-4">
//             {ninData ? (
//                 <div className="flex flex-col items-center">
//                     {/* Render Farmer Profile Image */}
//                     {isValidValue(ninData.photo) && (
//                         <div className="mb-4">
//                             <img
//                                 src={`data:image/jpeg;base64,${ninData.photo}`}
//                                 alt="Profile"
//                                 className="w-32 h-32 rounded-full object-cover border border-gray-200"
//                             />
//                         </div>
//                     )}

//                     {/* Profile Details */}
//                     <div className="grid grid-cols-1 gap-3 w-full sm:grid-cols-2">
//                         {isValidValue(ninData.firstname) && (
//                             <div className="border p-3 rounded-lg">
//                                 <strong>First Name:</strong> {ninData.firstname}
//                             </div>
//                         )}
//                         {isValidValue(ninData.middlename) && (
//                             <div className="border p-3 rounded-lg">
//                                 <strong>Middle Name:</strong> {ninData.middlename}
//                             </div>
//                         )}
//                         {isValidValue(ninData.surname) && (
//                             <div className="border p-3 rounded-lg">
//                                 <strong>Surname:</strong> {ninData.surname}
//                             </div>
//                         )}
//                         {isValidValue(ninData.gender) && (
//                             <div className="border p-3 rounded-lg">
//                                 <strong>Gender:</strong> {ninData.gender.toUpperCase()}
//                             </div>
//                         )}
//                         {isValidValue(ninData.birthdate) && (
//                             <div className="border p-3 rounded-lg">
//                                 <strong>Birth Date:</strong> {ninData.birthdate}
//                             </div>
//                         )}
//                         {isValidValue(ninData.state_of_origin) && (
//                             <div className="border p-3 rounded-lg">
//                                 <strong>State of Origin:</strong> {ninData.state_of_origin}
//                             </div>
//                         )}
//                         {isValidValue(ninData.lga_origin) && (
//                             <div className="border p-3 rounded-lg">
//                                 <strong>LGA of Origin:</strong> {ninData.lga_origin}
//                             </div>
//                         )}
//                         {isValidValue(ninData.profession) && (
//                             <div className="border p-3 rounded-lg">
//                                 <strong>Profession:</strong> {ninData.profession}
//                             </div>
//                         )}
//                         {isValidValue(ninData.telephoneno) && (
//                             <div className="border p-3 rounded-lg">
//                                 <strong>Telephone:</strong> {ninData.telephoneno}
//                             </div>
//                         )}
//                         {isValidValue(ninData.email) && (
//                             <div className="border p-3 rounded-lg">
//                                 <strong>Email:</strong> {ninData.email}
//                             </div>
//                         )}
//                         {isValidValue(ninData.maritalstatus) && (
//                             <div className="border p-3 rounded-lg">
//                                 <strong>Marital Status:</strong> {ninData.maritalstatus}
//                             </div>
//                         )}
//                     </div>
//                 </div>) : (
//                 <>
//                     <div className="flex items-center justify-center  text-center text-sm text-gray-400 mb-4">
//                         No farmer NIN details available.<br />
//                         Please verify user's  NIN
//                     </div>
//                     <form
//                         onSubmit={handleSubmit(onSubmit)}>

//                         <div className="space-y-4">
//                             <Input
//                                 label="What's your date of birth"
//                                 type="date"
//                                 id="dob"
//                                 placeholder="What is your company name"
//                                 {...register("dob")}
//                                 error={errors.dob?.message}
//                             />

//                             <Input
//                                 label="Enter your NIN"
//                                 type="number"
//                                 id="dob"
//                                 placeholder="11 digits"
//                                 {...register("nin")}
//                                 error={errors.nin?.message}
//                             />
//                         </div>

//                         <KadaButton
//                             className="!rounded-full !py-4 mt-3.5 w-full"
//                             type="submit"
//                             loading={isSubmitting || isPending}
//                         >
//                             Verify NIN
//                         </KadaButton>

//                     </form>
//                 </>)}

//             <div>

//                 {!profile.farmerProfile?.cooperative && ninData &&
//                     <Link
//                         type="button"
//                         className="!rounded-full !py-4 mt-3.5 w-full inline-flex items-center justify-center text-sm font-medium transition-colors h-[36px] text-white bg-primary-600"
//                         href={`/dashboard/enumerator/cooperative/${profile.id}`}
//                     >
//                         Join A Cooperative
//                     </Link>}
//             </div>
//         </div>
//     );
// };


// const farmData = (farm: IFarm, close: () => void) => {

//     // const { data, isFetching } = useGetFarmQuery({
//     //     enabled: true,
//     //     id: farm.id as string,
//     // });

//     // if (isFetching) {
//     //     return <div>Loading...</div>;
//     // }

//     const {
//         handleSubmit,
//         formState: { errors, isSubmitting },
//     } = useForm();

//     const { mutateAsync, isPending } = useVerifyFarmMutation();

//     const onSubmit = async (data: any) => {
//         toast.loading("Verifying ...");
//         const newData: any = {
//             data: {
//                 isVerified: true,
//             },
//             id: farm.id,
//             farmerId: farm.farmerId
//         };

//         await mutateAsync(newData, {
//             onSuccess: (response) => {
//                 console.log(response);
                
//                 if (response.success) {
//                     toast.success("Farm verified successfully");
//                     // update the current farm is the component with the new data from response.data

//                     close();
//                     toast.dismiss()
//                     // refresh the widows
//                     // window.location.reload();
//                 }
//             },
//             onError: (error) => {
//                 console.error(`Failed to verify farm:`, error);
//             },
//         });
//     };


//     return (<>
//         <div className="flex gap-3 w-full">

//             <div className="bg-white rounded-3xl shadow-[0px_0px_40px_0px_#C6C5C545]  [682px] w-[269px] p-3">
//                 <div className="relative w-full h-[105px]">
//                     <Image
//                         src="/images/crop-thumb.png"
//                         className="object-contai"
//                         alt="FGSC Farms"
//                         fill
//                     />
//                 </div>

//                 <div className="text-center mt-6">
//                     <h1 className="mt- text-lg font-bold">{farm?.name}</h1>
//                     <p className="text-base font-thin pt-1">
//                         {farm?.landArea} HECTRES
//                     </p>
//                     <p className="text-sm font-thin pt-2 max-w-[213px]">
//                         LGA: {farm?.lga}
//                     </p>
//                 </div>

//                 <div className="mt-4">
//                     <h4 className="text-[14px]">Crop(s)</h4>
//                     <div className="flex flex-wrap gap-[6px] justify-start text-sm font-thin mt-2 w-full text-black/85 whitespace-nowrap">
//                         {farm?.crops?.map((crop, index) => (
//                             <span
//                                 key={index + crop.name}
//                                 className="gap-2.5 self-stretch px-2.5 py-1 rounded border-zinc-200 border-[0.2px]"
//                             >
//                                 {crop.name}
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="mt-4 space-y-4">
//                     <h4 className="text-[14px] font-medium">Farming Season</h4>
//                     <div className="flex">
//                         <div className="">
//                             <svg
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     opacity="0.2"
//                                     d="M19.5 13.5C19.5 6.75 12 1.5 12 1.5C12 1.5 4.5 6.75 4.5 13.5C4.5 15.4891 5.29018 17.3968 6.6967 18.8033C8.10322 20.2098 10.0109 21 12 21C13.9891 21 15.8968 20.2098 17.3033 18.8033C18.7098 17.3968 19.5 15.4891 19.5 13.5Z"
//                                     fill="#5A96EA"
//                                 />
//                                 <path
//                                     d="M19.5 13.5C19.5 6.75 12 1.5 12 1.5C12 1.5 4.5 6.75 4.5 13.5C4.5 15.4891 5.29018 17.3968 6.6967 18.8033C8.10322 20.2098 10.0109 21 12 21C13.9891 21 15.8968 20.2098 17.3033 18.8033C18.7098 17.3968 19.5 15.4891 19.5 13.5Z"
//                                     stroke="#5A96EA"
//                                     stroke-width="2"
//                                     stroke-linecap="round"
//                                     stroke-linejoin="round"
//                                 />
//                                 <path
//                                     d="M12.75 18C14.625 17.6841 16.1822 16.125 16.5 14.25"
//                                     stroke="#5A96EA"
//                                     stroke-width="2"
//                                     stroke-linecap="round"
//                                     stroke-linejoin="round"
//                                 />
//                             </svg>
//                         </div>
//                         <span className="font-bold text-sm">{farm.activeSeason}</span>
//                     </div>
//                 </div>


//             </div>

//             <div className="w-full">
//                 <h4 className="text-lg font-bold">Farm Location</h4>
//                 <div className="h-[318px] w-full relative rounded-[20px]">
//                     <Map coordinates={farm.geoLocation as any} />
//                     <div className="absolute bottom-0 right-0 h-[163px] wfit z-[9999]">
//                         <div className="w-full bg-[#3865E0] h-full rounded-[14px] p-4 overflow-y-scroll">
//                             <div className="">
//                                 <CoordinateDisplay
//                                     geoLocation={farm.geoLocation as any}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//         </div>

//         <div>
//             <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="flex justify-end"
//             >
//                 <KadaButton
//                     className="!rounded-full !py-4 mt-3.5 w-fit"
//                     type="submit"
//                     disabled={farm.isVerified}
//                     loading={isSubmitting || isPending}
//                 >
//                     {farm.isVerified ? "Farm is verified" : "Verify Farm"}
//                 </KadaButton>

//             </form>
//         </div>

//     </>);
// }

// function ViewFarmerFarmModal({ close, item, activeTab }: ViewFarmerFarmModalProps) {

//     return (
//         <div
//             className="flex overflow-hidden flex-col w-full rounded-[10px] bg-white font-inter"
//         >
//             <header className="flex items-center justify-between border-b px-6 py-4 bg-[#F9F9F9]">
//                 <div className="flex flex-col">
//                     <h4 className="text-base font-semibold">{activeTab == "Farmers" ? "Farmers" : "Farms"} Details</h4>
//                 </div>

//                 <button onClick={close}>
//                     <CloseIcon className="w-4 h-4" />
//                 </button>
//             </header>

//             {/* Modal Body */}
//             <div className="bg-white p-6 divide-y">
//                 {activeTab === "Farmers" ? (
//                     farmerData((item as IUser), close)
//                 ) : (
//                     farmData((item as IFarm), close)
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ViewFarmerFarmModal;

