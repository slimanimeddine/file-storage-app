import { SideNavLayout } from "@/ui/sideNavLayout";
import Head from "next/head";

export default function Page() {
  return (
    <SideNavLayout>
      <Head>
        <title>Dashboard | Trash</title>
      </Head>
      <span>trash</span>
    </SideNavLayout>
  )
}