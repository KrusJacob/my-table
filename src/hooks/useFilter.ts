import { useMemo } from "react";
import { useTableStore } from "@/store/table";
import type { DataType } from "@/types";
import { formatDate } from "@/utils/formatDate";

export const useFilter = (data: DataType[]) => {
  const search = useTableStore((state) => state.temp);

  const filteredData = useMemo(() => {
    if (!search) return data;

    const lowerSearch = search.toLowerCase();

    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(lowerSearch) ||
        item.value.toString().includes(lowerSearch) ||
        formatDate(item.date).includes(lowerSearch)
      );
    });
  }, [data, search]);

  return filteredData;
};
