import { AppShell, Burger, Button, Flex, Group, NavLink, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconFiles, IconArrowRight, IconStar, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchFilesInput from "./searchFilesInput";
import CustomSegmentedControl from "./customSegmentedControl";
import FilesGridView from "./filesGridView";
import FilesTableView from "./filesTableView";
import UploadFileModal from "./uploadFileModal";
import NoFilesUploaded from "./noFilesUploaded";
import { OrganizationSwitcher, UserButton, SignedOut, SignInButton, SignedIn } from "@clerk/nextjs";

type Props = {
  title: string
};

const linkItems = [
  {
    label: "All Files",
    leftSection: <IconFiles />,
    href: "/dashboard/files",
  },
  {
    label: "Favorites",
    leftSection: <IconStar />,
    href: "/dashboard/favorites",
  },
  {
    label: "Trash",
    leftSection: <IconTrash />,
    href: "/dashboard/trash",
  },
]

export function SideNavLayout({ title }: Props) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const pathname = usePathname()
  const [view, setView] = useState("grid");

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" justify="space-between" px="md">
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Link href={"/"}>
              <MantineLogo size={30} />
            </Link>
          </Group>

          <SignedIn>
            <Button
              variant="light"
              leftSection={<IconFiles size={14} />}
              rightSection={<IconArrowRight size={14} />}
              component={Link}
              href={"/dashboard/files"}
            >
              Your files
            </Button>
          </SignedIn>

          <Flex
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <SignedIn>
              <OrganizationSwitcher />
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </Flex>


        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {linkItems.map(item => (
          <NavLink
            key={item.label}
            active={pathname === item.href}
            label={item.label}
            leftSection={item.leftSection}
            href={item.href}
            component={Link}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <h1>{title}</h1>
          <SearchFilesInput />
          <UploadFileModal />
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}>
          <CustomSegmentedControl value={view} setValue={setView} />
          <Select
            placeholder="Filter files"
            data={["All", "Image", "CSV", "PDF"]}
            defaultValue="All"
            allowDeselect={false}
          />
        </div>
        {view === "table" && <FilesTableView />}
        {view === "grid" && <FilesGridView />}
        <NoFilesUploaded />
      </AppShell.Main>
    </AppShell >
  );
}