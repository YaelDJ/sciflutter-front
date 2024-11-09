import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useUpdateFilters = (): ((
  event: React.ChangeEvent<HTMLSelectElement>,
  filter: string
) => void) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const changeFilter = (filter: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(filter, value);
    } else {
      params.delete(filter);
    }

    replace(`${pathname}?${params.toString()}`, {scroll: false});
  };

  const handleSelectOption = (
    event: React.ChangeEvent<HTMLSelectElement>,
    filter: string
  ) => {
    changeFilter(filter, event.target.value);
  };

  return handleSelectOption;
};
