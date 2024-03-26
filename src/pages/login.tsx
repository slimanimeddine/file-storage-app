import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
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
        <title>Login</title>
      </Head>
      <div style={{
        width: "100%",
      }}>
        <Container size={420} my={40}>
          <Title ta="center" className={classes.title}>
            Welcome back!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{" "}
            <Anchor size="sm" component={Link} href={"/signup"}>
              Create account
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="you@mantine.dev" required />
            <PasswordInput label="Password" placeholder="Your password" required mt="md" />
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component={Link} href={"/forgotpassword"} size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl">
              Sign in
            </Button>
          </Paper>
        </Container>
      </div>

    </RootLayout>
  );
}