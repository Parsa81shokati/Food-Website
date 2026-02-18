export const SORT_PRESETS = {
  DEFAULT: [
    {
      key: "newest",
      label: "Newest First",
      field: "createdAt",
      direction: "desc",
    },
    {
      key: "oldest",
      label: "Oldest First",
      field: "createdAt",
      direction: "asc",
    },
  ],

  FOOD: [
    {
      key: "nameAsc",
      label: "Name (A-Z)",
      field: "title",
      direction: "asc",
    },
    {
      key: "nameDesc",
      label: "Name (Z-A)",
      field: "title",
      direction: "desc",
    },
    {
      key: "priceLow",
      label: "Price: Low to High",
      field: "price",
      direction: "asc",
    },
    {
      key: "priceHigh",
      label: "Price: High to Low",
      field: "price",
      direction: "desc",
    },
    {
      key: "category",
      label: "By Category",
      field: "category",
      direction: "asc",
    },
  ],
  CATEGORY: [
    {
      key: "nameAsc",
      label: "Name (A-Z)",
      field: "name",
      direction: "asc",
    },
    {
      key: "nameDesc",
      label: "Name (Z-A)",
      field: "name",
      direction: "desc",
    },
  ],
  ORDER: [
    {
      key: "orderStatus",
      label: "By Order Status",
      field: "orderStatus",
      direction: "asc",
    },
  ],
  USER: [
    {
      key: "nameAsc",
      label: "Name (A-Z)",
      field: "firstName",
      direction: "asc",
    },
    {
      key: "nameDesc",
      label: "Name (Z-A)",
      field: "firstName",
      direction: "desc",
    },
    {
      key: "role",
      label: "Role",
      field: "role",
      direction: "desc",
    },
    {
      key: "status",
      label: "Status",
      field: "status",
      direction: "desc",
    },
  ],
};
