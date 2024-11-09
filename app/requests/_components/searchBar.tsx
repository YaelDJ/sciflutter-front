'use client'

import { useSearchBar } from "@/app/_hooks/useSearchBar";
import { useRef } from "react"

const queryParams = [
  'page',
  'status',
  'type',
  'sort',
  'id'
]

const SearchBar = () => {
  const { searchInput, handleTypeSearch } = useSearchBar(queryParams);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    handleTypeSearch(value)
  }

  return (
    <div className="c-requests-options__search-bar">
      <input
        type="search"
        placeholder="Search request by id"
        value={searchInput}
        onChange={handleUserInput}
        ref={inputRef}
      />
    </div>
  );
}

export default SearchBar