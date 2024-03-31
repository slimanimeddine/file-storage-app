import { ActionIcon, Avatar, Grid, Menu, rem } from "@mantine/core"
import { IconPhoto, IconDotsVertical, IconDownload, IconStar, IconTrash, IconArrowBack } from "@tabler/icons-react"
import Image from "next/image"

function ActionsMenu() {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon variant="transparent" aria-label="Actions">
          <IconDotsVertical style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>

      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}>
          Download
        </Menu.Item>
        <Menu.Item leftSection={<IconStar style={{ width: rem(14), height: rem(14) }} />}>
          Favorite
        </Menu.Item>
        <Menu.Item leftSection={<IconStar style={{ width: rem(14), height: rem(14) }} />}>
          Unfavorite
        </Menu.Item>

        <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
          Delete
        </Menu.Item>
        <Menu.Item color="green" leftSection={<IconArrowBack style={{ width: rem(14), height: rem(14) }} />}>
          Restore
        </Menu.Item>

      </Menu.Dropdown>
    </Menu>
  )
}

function SingleFile() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        border: "1px solid #e1e1e1",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2
          }}
        >
          <IconPhoto />
          another screenshot
        </span>
        <ActionsMenu />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Image style={{
          objectFit: "contain",
        }} src={"/imed-02.jpg"} width={100} height={200} alt="file" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2
          }}
        >
          <Avatar src={"/imed-02.jpg"} size="sm" alt="it's me" />
          <span
            style={{
              fontSize: 15,
            }}
          >
            slimani
          </span>
        </span>
        <span
          style={{
            fontSize: 15,
          }}
        >
          Uploaded on today at 5:40 PM
        </span>
      </div>
    </div>
  )
}

export default function FilesGridView() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}><SingleFile /></Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}><SingleFile /></Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}><SingleFile /></Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}><SingleFile /></Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}><SingleFile /></Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}><SingleFile /></Grid.Col>
    </Grid>
  )
}
