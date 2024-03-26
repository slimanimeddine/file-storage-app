import { Image, Container, Title, Text, Button, SimpleGrid } from "@mantine/core";
import classes from "@/styles/notFound.module.css";
import { useRouter } from "next/router";
import RootLayout from "@/ui/rootLayout";
import Head from "next/head";

export default function Page() {
  const router = useRouter()
  return (
    <RootLayout>
      <Head>
        <title>Page Not Found</title>
      </Head>

      <Container className={classes.root}>
        <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
          <Image src={"./404.svg"} className={classes.mobileImage} alt="" />
          <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text c="dimmed" size="lg">
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <Button variant="outline" size="md" mt="xl" className={classes.control} onClick={() => router.push("/")}>
              Get back to home page
            </Button>
          </div>
          <Image src={"./404.svg"} className={classes.desktopImage} alt="" />
        </SimpleGrid>
      </Container>
    </RootLayout>
  );
}