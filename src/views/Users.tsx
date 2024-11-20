//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BasicTable } from "../components/TableUsers";
import { Search } from "../components/Search";
import { ModalUsers } from "../components/ModalUsers";
import { useState } from "react";
import { RefreshButton } from "../components/refreshButton";

export function Users() {
  const [search, setSearch] = useState("");
  function handleClearSearch() {
    setSearch("");
  }

  function handleSearch(query: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-10 m-auto h-min  ">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-semibold text-black">Usuarios</h2>
      </div>

      <div className="flex flex-col md:flex-row  items-center space-y-4 md:space-y-0 mb-6 w-full">
        <Search
          onSearch={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          className="hidden sm:flex mr-5"
          value={search}
        />
        <RefreshButton
          queryK={["userInfo"]}
          onClearSearch={handleClearSearch}
        />

        <div className=" w-full flex justify-end">
          <ModalUsers />
        </div>
      </div>
      <BasicTable searchInput={search} />
    </div>
  );
}
