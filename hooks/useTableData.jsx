import { useMemo, useState } from "react";

export function useTableData({ data, searchableFields = [] }) {
  const [query, setQuery] = useState(""); //متن جستجوی کاربر
  const [sortConfig, setSortConfig] = useState({
    field: null, //ستونی که بر اساسش sort می‌کنیم
    direction: "asc",
  });

  const processedData = useMemo(() => {
    let list = [...data]; //کپی امن از داده‌ها
    //ما هرگز داده‌ی اصلی رو mutate نمی‌کنیم

    //  SEARCH
    if (query && searchableFields.length) {
      //کاربر چیزی تایپ کرده باشه و فیلدی برای جستجو تعریف شده باشه
      const lower = query.toLowerCase();
      list = list.filter((item) =>
        searchableFields.some((field) => {
          const value = item[field];
          return (
            typeof value === "string" && value.toLowerCase().includes(lower)
          );
        }),
      );
    }

    //  SORT
    if (sortConfig.field) {
      list.sort((a, b) => {
        let aVal = a[sortConfig.field];
        let bVal = b[sortConfig.field];

        if (sortConfig.field === "price") {
          aVal = parseFloat(aVal) || 0;
          bVal = parseFloat(bVal) || 0;
        }

        if (sortConfig.field === "createdAt") {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [data, query, sortConfig, searchableFields]);

  return {
    data: processedData,
    onSearch: setQuery,
    onSortChange: setSortConfig,
    sortConfig,
  };
}
