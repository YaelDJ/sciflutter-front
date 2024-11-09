import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useSearchBar = (
  queryParams: string[] = []
): {
  searchInput: string;
  handleSetSearchInput: (input: string) => void;
  handleSearchButton: (event: React.FormEvent<HTMLFormElement>) => void;
  handleTypeSearch: (textInput: string) => void;
} => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {push} = useRouter();

  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get("search")?.toString() ?? ""
  );

  const handleSetSearchInput = (input: string) => {
    if (!input) return handleTypeSearch(input)

    setSearchInput(input)
  }

  const handleSearch = (searchInput: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }

    queryParams.forEach((param) => params.delete(param));

    push(`${pathname}?${params.toString()}`, {scroll: false});
  };

  const handleSearchButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSearch(searchInput);
  };

  const handleTypeSearch = useDebouncedCallback((textInput: string) => {
    setSearchInput(textInput);
    handleSearch(textInput);
  }, 300);

  return {searchInput, handleSetSearchInput, handleSearchButton, handleTypeSearch};
};
