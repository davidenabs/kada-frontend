import React from "react";
import Select from "@/components/form/select";
import { BadgeTag, SearchIcon } from "@/icons";
import Button from "@/components/form/button";
import { useGetMarketsQuery } from "@/app/_api/market";
import useDebounce from "@/hooks/use-debounce";

interface SearchSectionProps {
  setShowDetails: (show: boolean) => void;
  setSelectedMarket: (market: any) => void;
  selectedMarket: any | null;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  setShowDetails,
  setSelectedMarket,
  selectedMarket,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const debouncedSearchQuery = useDebounce(search);
  const [products, setProducts] = React.useState<any[]>([]);
  const [value, setValue] = React.useState(null);

  const { data, isFetching, isRefetching, isError } = useGetMarketsQuery({
    enabled: loaded,
    params: {
      search: debouncedSearchQuery,
      page: 1,
      limit: 10,
    },
  });

  React.useEffect(() => {
    if (data?.data && data.success && !isFetching && !isRefetching) {
      setProducts(
        data.data.markets.map((market) => ({
          label: market.name,
          value: market.id,
          data: market,
        }))
      );
    }
  }, [data, isFetching, isRefetching]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="flex flex-col w-[41%] max-md:ml-0 max-md:w-full overflow-hidden rounded-2xl bg-transparent relative">
      <img
        src="/images/price-market-insght-bg.png"
        alt="Pricing Header Background"
        className="absolute w-full max-w-none"
      />
      <div className="flex flex-col grow pt-48 mt-2.5 leading-tight rounded-2xl max-md:pt-24 max-md:mt-10 max-md:max-w-full z-10">
        <div className="flex overflow-hidden flex-col px-16 pt-6 pb-28 bg-white rounded-2xl min-h-[434px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
          <div className="flex flex-col justify-center w-full">
            <div className="flex flex-col items-center self-center max-w-full w-[472px]">
              <BadgeTag className="w-12 h-12" />
              <h2 className="mt-1 text-2xl font-semibold text-green-600 uppercase">
                MARKET
              </h2>
              <p className="mt-1 text-sm text-center text-neutral-700 max-md:max-w-full">
                Get insight on product pricing
              </p>
            </div>
            <form className="self-stretch space-y-5 gap-6 items-start mt-10 w-full">
              {/* <Select
                label="Market"
                value="Select Market"
                options={marketOptions}
                onChange={() => {}}
                className="px-5 py-6  self-stretch border bg-transparent"
              /> */}

              <Select
                label="Select Market"
                searchable={true}
                options={products}
                value={value}
                onChange={(e: any) => {
                  setValue(e);
                  setShowDetails(true);
                  setSelectedMarket(e.data);
                }}
                clearable={value !== null}
                onClear={() => {
                  setValue(null);
                  setSearch("");
                }}
                onSearchChange={(e) => {
                  setSearch(e);
                }}
                disableDefaultFilter
                searchPlaceHolder="Search here..."
                searchPrefix={<SearchIcon className="fill-black" />}
              />

              {/* <Button
                handleClick={() => setShowDetails(true)}
                className="w-full h-fit rounded-full gap-3"
              >
                <SearchIcon className="fill-yellow-500" />
                Search
              </Button> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
