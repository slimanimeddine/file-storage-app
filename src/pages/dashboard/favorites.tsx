import { SideNavLayout } from "@/ui/sideNavLayout";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Dashboard | Favorites</title>
      </Head>
      <SideNavLayout title="Favorites" favorites={true} />
    </>
  )
}