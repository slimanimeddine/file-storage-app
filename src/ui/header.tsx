import { Group, Button, Box, } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "@/styles/header.module.css";
import { IconArrowRight, IconFiles } from "@tabler/icons-react";
import Link from "next/link";
import UserButton from "./UserButton";

export default function Header() {
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href={"/"}>
            <MantineLogo size={30} />
          </Link>

          <Button
            variant="light"
            leftSection={<IconFiles size={14} />}
            rightSection={<IconArrowRight size={14} />}
            component={Link}
            href={"/dashboard/files"}
          >
            Your files
          </Button>

          <Group>
            {/* <Button variant="default" component={Link} href={"/login"}>Log in</Button>
            <Button component={Link} href={"/signup"}>Sign up</Button> */}
            <UserButton />
          </Group>

        </Group>
      </header>
    </Box>
  );
}