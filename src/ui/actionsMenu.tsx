import { ActionIcon, Menu, rem } from "@mantine/core"
import { IconDotsVertical, IconDownload, IconStar, IconTrash, IconArrowBack } from "@tabler/icons-react"

export default function ActionsMenu() {
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