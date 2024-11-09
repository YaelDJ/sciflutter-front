'use client'
import { useSearchParams } from "next/navigation";

import { useUpdateFilters } from "@/app/_hooks/useUpdateFilterts";

const FilterSort = () => {
  const searchParams = useSearchParams();
  const handleSelectOption = useUpdateFilters();

  return (
    <div className="c-filter-sort">
      <div className="c-filter-sort__filters">
        <div className="c-filter-sort__item">
          <label htmlFor="status" className="c-filter-sort__item-title">
            Status
          </label>

          <select
            name="status"
            id="status"
            className="c-filter-sort__item-options"
            defaultValue={searchParams.get("status") ?? ""}
            onChange={(e) => handleSelectOption(e, "status")}
          >
            <option value="">---</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="c-filter-sort__item">
          <label htmlFor="type" className="c-filter-sort__item-title">
            Type
          </label>

          <select
            name="type"
            id="type"
            className="c-filter-sort__item-options"
            defaultValue={searchParams.get("type") ?? ""}
            onChange={(e) => handleSelectOption(e, "type")}
          >
            <option value="">---</option>
            <option value="publish">Publish</option>
            <option value="ticket">Ticket</option>
          </select>
        </div>
      </div>

      <div className="c-filter-sort__item">
        <label htmlFor="sort" className="c-filter-sort__item-title">
          Sort
        </label>

        <select
          name="sort"
          id="sort"
          className="c-filter-sort__item-options"
          defaultValue={searchParams.get("sort") ?? ""}
          onChange={(e) => handleSelectOption(e, "sort")}
        >
          <option value="">---</option>
          <option value="date">Date ascending</option>
          <option value="-date">Date descending</option>
          <option value="status">Status ascending</option>
          <option value="-status">Status descending</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSort