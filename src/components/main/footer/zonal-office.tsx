import React from 'react';

interface ZonalOffice {
  name: string;
  address: string;
}

const zonalOffices: ZonalOffice[] = [
  {
    name: "Mai Gana Agric Zonal Office",
    address: "Tudun Saibu community, Maigana, Saba Local Government Area"
  },
  {
    name: "Samaru Agric Zonal Office",
    address: "Samaru Kataf Along Zankuwa Kagoro Road Zangan Kataf Local Government Area."
  },
  {
    name: "Lere Agric Zonal Office",
    address: "Zonal Head Quarter, Sabon Birni Saminaka, Lere Local Government Area"
  },
  {
    name: "Birni Gwari Agric Zonal Office",
    address: "Aliyu Makama Road, Adjacent Living fiath Church, Garden, Kaduna South Local Government Area"
  }
];

const ZonalOffices: React.FC = () => {
  return (
    <div className="flex flex-col mt-6 max-w-full w-[268px]">
      <h3 className="text-base leading-tight text-zinc-700">Zonal Offices</h3>
      {zonalOffices.map((office, index) => (
        <div key={index} className="flex flex-col mt-4 w-full text-sm tracking-wide">
          <h4 className="font-bold leading-snug text-zinc-700">{office.name}</h4>
          <p className="mt-1 leading-5 text-zinc-500">{office.address}</p>
        </div>
      ))}
    </div>
  );
};

export default ZonalOffices;