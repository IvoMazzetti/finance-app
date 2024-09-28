import Header from "@/components/header";
import { QueryProvider } from "../providers/query-provider";

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
        <Header/>
        <main className="px-3 lg:px-14">
          <QueryProvider>
            {children}
          </QueryProvider>
        </main>
    </>

  )
}

export default DashboardLayout;