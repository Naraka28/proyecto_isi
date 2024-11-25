import { ProductTable } from "../components/TableProducts";
import { Search } from "../components/Search";
import { ModalProducts } from "../components/ModalProducts";
import { useState } from "react";

import { RefreshButton } from "../components/refreshButton";

export function Products() {
  const [search, setSearch] = useState("");
  function handleSearch(query: string): void {
    throw new Error("Function not implemented.");
  }
  function handleClearSearch() {
    setSearch("");
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
            value={search}
          />
          <RefreshButton
            queryK={["productInfo"]}
            onClearSearch={handleClearSearch}
          />

          <div className=" w-full flex justify-end">
            <ModalProducts texto="Agregar" />
          </div>
        </div>
        <ProductTable searchInput={search} />
      </div>
    </>
  );
}
