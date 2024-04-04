import { Group, Button, Box, Flex, } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "@/styles/header.module.css";
import Link from "next/link";
import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href={"/"}>
            <MantineLogo size={30} />
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