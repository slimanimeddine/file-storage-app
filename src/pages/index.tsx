import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "@/styles/home.module.css";
import RootLayout from "@/ui/rootLayout";
import Head from "next/head";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";

export default function Page() {
  const organization = useOrganization()
  const user = useUser()

  let orgId: string | undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }
  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const createFile = useMutation(api.files.createFile);

  return (
    <RootLayout>
      <Head>
        <title>File Storage App</title>
      </Head>
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container} size="md">
          <Title className={classes.title}>The easiest way to upload and share files with your company</Title>
          <Text className={classes.description} size="xl" mt="xl">
            Make an account an start managing your files in less than a minute.
          </Text>

          <Button variant="gradient" size="xl" radius="xl" className={classes.control} component={Link} href={"/dashboard/files"}>
            Get started
          </Button>
          <Button variant="gradient" size="xl" radius="xl" className={classes.control} onClick={() => {
            if (!orgId) return;
            createFile({
              name: "test",
              orgId
            });
          }}>
            upload
          </Button>
          {files?.map(item => <p style={{ color: "white" }} key={item._id}>{item.name}</p>)}
        </Container>
      </div>
    </RootLayout>
  );

}