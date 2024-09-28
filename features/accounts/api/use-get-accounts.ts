import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccounts = () => {
   const query = useQuery({
       queryKey: ["accounts"],
       queryFn: async () => {
           const resposnse = await client.api.accounts.$get();

           if (!resposnse.ok) {
               throw new Error(resposnse.statusText);
           }

           const { data } = await resposnse.json();
           return data;
       },
   });

   return query;
}