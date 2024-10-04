import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategories = () => {
   const query = useQuery({
       queryKey: ["categories"],
       queryFn: async () => {
           const resposnse = await client.api.categories.$get();

           if (!resposnse.ok) {
               throw new Error(resposnse.statusText);
           }

           const { data } = await resposnse.json();
           return data;
       },
   });

   return query;
}