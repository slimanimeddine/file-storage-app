import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "@/styles/home.module.css";
import RootLayout from "@/ui/rootLayout";
import Head from "next/head";
import Link from "next/link";

export default function Page() {
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
            Make an account and start managing your files in less than a minute.
          </Text>

          <Button variant="gradient" size="xl" radius="xl" className={classes.control} component={Link} href={"/dashboard/files"}>
            Get started
          </Button>
        </Container>
      </div>
    </RootLayout>
  );

}