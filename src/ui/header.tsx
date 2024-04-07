import { Group, Button, Box, Flex } from "@mantine/core";
import classes from "@/styles/header.module.css";
import Link from "next/link";
import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Logo from "./logo";
import logoClasses from "@/styles/logo.module.css"

export default function Header() {
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link className={logoClasses.link} href={"/"}>
            <Logo />
          </Link>
          <Flex
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <SignedIn>
              <OrganizationSwitcher />
            </SignedIn>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </Flex>
        </Group>
      </header>
    </Box>
  );
}