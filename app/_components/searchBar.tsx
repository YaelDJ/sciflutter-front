"use client"

import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { type FC, useRef } from "react";

import '@/styles/components/search-bar.scss'
import { useSearchBar } from "../_hooks/useSearchBar";

const queryParams = [
  'page',
  'sort',
  'year',
  'discipline'
]

const SearchBar: FC = () => {
  const { searchInput, handleSetSearchInput, handleSearchButton } = useSearchBar(queryParams)
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    handleSetSearchInput(value);
  };

  return (
    <form className="c-search-bar" onSubmit={handleSearchButton}>
      <div className="c-search-bar__bar">
        <label htmlFor="main-search" className="c-search-bar__label">
          <MagnifyingGlass
            size={32}
            weight="regular"
            className="c-search-bar__icon"
          />
        </label>

        <input
          className="c-search-bar__input"
          type="search"
          name="main-search"
          id="main-search"
          placeholder="Buscar un tema o autor..."
          value={searchInput}
          onChange={handleUserInput}
          ref={inputRef}
        />
      </div>

      <button className="c-search-bar__btn">
        <span>
          Buscar{" "}
          <ArrowRight size={32} weight="light" className="c-search-bar__icon" />
        </span>
      </button>
    </form>
  );
}

export default SearchBar