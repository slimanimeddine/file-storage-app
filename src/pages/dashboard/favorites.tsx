import { SideNavLayout } from "@/ui/sideNavLayout";
import Head from "next/head";

export default function Page() {
  return (
    <SideNavLayout>
      <Head>
        <title>Dashboard | Favorites</title>
      </Head>
      <span>favorites</span>
    </SideNavLayout>
  )
}