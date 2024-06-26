import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "@/styles/serverError.module.css";
import RootLayout from "@/ui/rootLayout";
import Head from "next/head";

export default function Page() {
  return (
    <RootLayout>
      <Head>
        <title>Server Error</title>
      </Head>

      <div className={classes.root}>
        <Container>
          <div className={classes.label}>500</div>
          <Title className={classes.title}>Something bad just happened...</Title>
          <Text size="lg" ta="center" className={classes.description}>
            Our servers could not handle your request. Don&apos;t worry, our development team was
            already notified. Try refreshing the page.
          </Text>
          <Group justify="center">
            <Button variant="white" size="md">
              Refresh the page
            </Button>
          </Group>
        </Container>
      </div>
    </RootLayout>
  );
}