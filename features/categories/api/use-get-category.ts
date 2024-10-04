import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategory = (id?: string) => {
   const query = useQuery({
        enabled: !!id,
        queryKey: ["category", { id }],
        queryFn: async () => {
            const resposnse = await client.api.categories[":id"].$get({
                param: { id },
            });

            if (!resposnse.ok) {
                throw new Error(resposnse.statusText);
            }

            const { data } = await resposnse.json();
            return data;
       },
   });

   return query;
}