import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/lib/utils";

export const useGetTransaction = (id?: string) => {
   const query = useQuery({
        enabled: !!id,
        queryKey: ["transaction", { id }],
        queryFn: async () => {
            const resposnse = await client.api.transactions[":id"].$get({
                param: { id },
            });

            if (!resposnse.ok) {
                throw new Error("Failed to fetch transaction");
            }

            const { data } = await resposnse.json();
            return {
                ...data,
                amount: convertAmountFromMiliunits(data.amount),
            };
       },
   });

   return query;
}