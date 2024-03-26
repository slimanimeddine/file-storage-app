import { ActionIcon, Alert, AppShell, Burger, Button, Center, FileInput, Group, Modal, NavLink, SegmentedControl, Select, TextInput, TextInputProps, rem, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconFiles, IconArrowRight, IconStar, IconTrash, IconSearch, IconLayoutGrid, IconLayoutRows, IconUpload, IconInfoCircle } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SetStateAction, useState } from "react";

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

function InputWithButton(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Search files"
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }
      {...props}
    />
  );
}

type CustomSegmentedControlProps = {
  value: string,
  setValue: (value: SetStateAction<"grid" | "table">) => void
}

function CustomSegmentedControl({ value, setValue }: CustomSegmentedControlProps) {
  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      data={[
        {
          value: "grid",
          label: (
            <Center style={{ gap: 10 }}>
              <IconLayoutGrid style={{ width: rem(16), height: rem(16) }} />
              <span>Grid</span>
            </Center>
          ),
        },
        {
          value: "table",
          label: (
            <Center style={{ gap: 10 }}>
              <IconLayoutRows style={{ width: rem(16), height: rem(16) }} />
              <span>Table</span>
            </Center>
          ),
        }
      ]}
    />
  )
}

function CustomAlert({ text }: { text: string }) {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="blue" icon={icon}>
      {text}
    </Alert>
  );
}

function UploadFileModal() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal size="md" centered opened={opened} onClose={close} title={<h4>Upload Your File Here</h4>}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <CustomAlert text="This file will be accessible by anyone in your organization" />
          <TextInput
            label="Title"
            placeholder="Title"
          />

          <FileInput
            label="File"
            placeholder="No file selected"
            leftSection={<IconUpload />}
          />

          <Button>Submit</Button>
        </div>
      </Modal>

      <Button onClick={open}>Upload File</Button>
    </>
  )
}

function FilesTable() {
  return (
    <DataTable
      withTableBorder
      borderRadius="md"
      highlightOnHover
      minHeight={150}
      columns={[
        { accessor: "name" },
        { accessor: "type" },
        { accessor: "user" },
        { accessor: "uploaded on" },
        { accessor: "actions" }
      ]}
      records={[]}
    />
  )
}

export function SideNavLayout({ title }: Props) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const pathname = usePathname()
  const [view, setView] = useState<"grid" | "table">("grid");

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
            <MantineLogo size={30} />
          </Group>
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
          <InputWithButton />
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
        {view === "table" && <FilesTable />}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              marginTop: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image src={"/no_data.svg"} width={200} height={200} alt="no data" />
            <h3>You haven&apos;t uploaded any files yet</h3>
          </div>
        </div>
      </AppShell.Main>
    </AppShell >
  );
}