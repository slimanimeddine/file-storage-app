import { SideNavLayout } from "@/ui/sideNavLayout";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Dashboard | Files</title>
      </Head>
      <SideNavLayout title="Your Files" />
    </>
  )
}