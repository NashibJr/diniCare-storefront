import { useQuery } from "@tanstack/react-query";
import actions from "../../api/actions/actions";

const useProducts = (page: number = 1, limit: number = 100) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-products", page, limit],
    queryFn: async () => {
      const { data, total, pages } = await actions.getProducts(page, limit);
      if (Array.isArray(data)) {
        return { page, pages, total, data };
      }

      return { page, pages: 1, total: 0, data: [] };
    },
  });

  return { data, isLoading };
};

export default useProducts;
