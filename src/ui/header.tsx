import { Group, Button, Box, } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "@/styles/header.module.css";
import { IconArrowRight, IconFiles } from "@tabler/icons-react";

export default function Header() {
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />

          <Button
            variant="light"
            leftSection={<IconFiles size={14} />}
            rightSection={<IconArrowRight size={14} />}
          >
            Your files
          </Button>

          <Group>
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>

        </Group>
      </header>
    </Box>
  );
}