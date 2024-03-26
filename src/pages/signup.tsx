import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import classes from "@/styles/login.module.css"
import Link from "next/link";
import Head from "next/head";
import RootLayout from "@/ui/rootLayout";

export default function Page() {
  return (
    <RootLayout>
      <Head>
        <title>Sign up</title>
      </Head>
      <div style={{
        width: "100%",
      }}>
        <Container size={420} my={40}>
          <Title ta="center" className={classes.title}>
            Welcome!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account?{" "}
            <Anchor size="sm" component={Link} href="/login">
              Login
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Name" placeholder="Your name" required />
            <TextInput label="Email" placeholder="you@mantine.dev" required mt="md" />
            <PasswordInput label="Password" placeholder="Your password" required mt="md" />
            <Button fullWidth mt="xl">
              Sign up
            </Button>
          </Paper>
        </Container>
      </div>
    </RootLayout>
  );
}