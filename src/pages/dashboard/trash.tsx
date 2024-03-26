import { SideNavLayout } from "@/ui/sideNavLayout";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Dashboard | Trash</title>
      </Head>
      <SideNavLayout title="Trash" />
    </>
  )
}