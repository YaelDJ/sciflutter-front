"use client";
import {useSearchParams} from "next/navigation";

import {useUpdateFilters} from "../_hooks/useUpdateFilterts";

import "@/styles/components/filter-sort.scss";

const SORT_OPTIONS = [
  {value: "createdAt", name: "Mas reciente"},
  {value: "-createdAt", name: "Mas antiguo"},
  {value: "name", name: "A-Z"},
  {value: "-name", name: "Z-A"},
];

interface Props {
  articleFilters: {
    disciplines: string[];
    years: number[];
  };
  authorFilters: string[];
}

const FilterSort: React.FC<Props> = ({articleFilters, authorFilters}) => {
  const searchParams = useSearchParams();
  const handleSelectOption = useUpdateFilters();

  const disciplines = Array.from(
    new Set([...articleFilters.disciplines, ...authorFilters])
  );

  return (
    <div className="c-filter-sort">
      <div className="c-filter-sort__filters">
        <div className="c-filter-sort__item">
          <p className="c-filter-sort__item-title">Year</p>
          <select
            className="c-filter-sort__item-options"
            defaultValue={searchParams.get("year") ?? ""}
            onChange={(e) => handleSelectOption(e, "year")}
          >
            <option value="">---</option>
            {articleFilters.years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="c-filter-sort__item">
          <p className="c-filter-sort__item-title">Discipline</p>
          <select
            className="c-filter-sort__item-options"
            defaultValue={searchParams.get("discipline") ?? ""}
            onChange={(e) => handleSelectOption(e, "discipline")}
          >
            <option value="">---</option>
            {disciplines.length > 0 &&
              disciplines.map((discipline) => (
                <option value={discipline} key={discipline}>
                  {discipline}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="sort">
        <div className="c-filter-sort__item">
          <p className="c-filter-sort__item-title">Sort by</p>

          <select
            className="c-filter-sort__item-options"
            onChange={(e) => handleSelectOption(e, "sort")}
          >
            {SORT_OPTIONS.map((option) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
