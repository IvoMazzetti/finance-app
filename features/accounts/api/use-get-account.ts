import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccount = (id?: string) => {
   const query = useQuery({
        enabled: !!id,
        queryKey: ["accounts", { id }],
        queryFn: async () => {
            const resposnse = await client.api.accounts[":id"].$get({
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