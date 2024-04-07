import { AppShell, Burger, Button, Flex, Group, NavLink, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFiles, IconStar, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchFilesInput from "./searchFilesInput";
import CustomSegmentedControl from "./customSegmentedControl";
import FilesGridView from "./filesGridView";
import FilesTableView from "./filesTableView";
import UploadFileModal from "./uploadFileModal";
import { OrganizationSwitcher, UserButton, SignedOut, SignInButton, SignedIn, useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { TFile } from "@/types";
import Logo from "./logo";
import logoClasses from "@/styles/logo.module.css"

type Props = {
  title: string,
  isFavorites?: boolean,
  isTrash?: boolean,
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

export function SideNavLayout({ title, isFavorites = false, isTrash = false }: Props) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const pathname = usePathname()
  const [view, setView] = useState("grid");

  const [query, setQuery] = useState("");

  const [type, setType] = useState("all");

  const organization = useOrganization()
  const user = useUser()

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  )

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query, favorites: isFavorites, trash: isTrash, type: type === "all" ? undefined : type as "image" | "pdf" | "csv" } : "skip") as TFile[] | undefined | null;

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
            <Link className={logoClasses.link} href={"/"}>
              <Logo />
            </Link>
          </Group>

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
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          justify={{ sm: "space-between" }}
          align={{ sm: "center" }}
          mb={20}
        >
          <h1>{title}</h1>
          <SearchFilesInput setQuery={setQuery} />
          <UploadFileModal />
        </Flex>

        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          justify={{ sm: "space-between" }}
          align={{ sm: "center" }}
          mb={20}
        >
          <CustomSegmentedControl value={view} setValue={setView} />
          <Select
            placeholder="Filter files"
            data={[
              { label: "All", value: "all" },
              { label: "Image", value: "image" },
              { label: "CSV", value: "csv" },
              { label: "PDF", value: "pdf" },
            ]}
            value={type}
            allowDeselect={false}
            onChange={(_value, option) => setType(option.value)}
          />
        </Flex>

        {view === "table" && <FilesTableView favorites={favorites} files={files} />}
        {view === "grid" && <FilesGridView favorites={favorites} files={files} query={query} />}
      </AppShell.Main>
    </AppShell >
  );
}