import { faPlus, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "../components/DashButton";
import { ProductTable } from "../components/TableProducts";
import { Search } from "../components/Search";
import { ModalProducts } from "../components/ModalProducts";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { RefreshButton } from "../components/refreshButton";

export function Products() {
  const [search, setSearch] = useState("");
  function handleSearch(query: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="p-10 m-auto h-min  ">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-semibold text-black">Productos</h2>
        </div>

        <div className="flex flex-col md:flex-row  items-center space-y-4 md:space-y-0 mb-6 w-full">
          <Search
            onSearch={handleSearch}
            onChange={(e) => setSearch(e.target.value)}
            className="hidden sm:flex mr-5"
          />
          <RefreshButton queryK={["employeeInfo"]} />

          <div className=" w-full flex justify-end">
            <ModalProducts />
          </div>
        </div>
        <ProductTable searchInput={search} />
      </div>
    </>
  );
}
