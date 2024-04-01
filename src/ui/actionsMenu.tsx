import { ActionIcon, Menu, rem, Text } from "@mantine/core"
import { IconDotsVertical, IconDownload, IconStar, IconTrash, IconArrowBack } from "@tabler/icons-react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Doc } from "../../convex/_generated/dataModel"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import classes from "@/styles/uploadFile.module.css"

function Delete({ file }: { file: Doc<"files"> }) {
  const deleteFile = useMutation(api.files.deleteFile)

  const openModal = () => modals.openConfirmModal({
    title: "Delete file",
    children: (
      <Text size="sm">
        Are you sure you want to delete this file?
      </Text>
    ),
    labels: { confirm: "Delete file", cancel: "Cancel" },
    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => {
      deleteFile({
        fileId: file._id
      })
      notifications.show({
        title: "File deleted",
        message: "File has been deleted",
        classNames: classes,
      })
    },
  });

  // return <Button onClick={openModal}>Open confirm modal</Button>;
  return (
    <Menu.Item
      component="button"
      onClick={openModal}
      color="red"
      leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
    >
      Delete
    </Menu.Item>
  )
}

export default function ActionsMenu({ file }: { file: Doc<"files"> }) {
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

        {/* <Menu.Item
          component="button"
          onClick={() => deleteFile({
            fileId: file._id
          })}
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete
        </Menu.Item> */}
        <Delete file={file} />
        <Menu.Item color="green" leftSection={<IconArrowBack style={{ width: rem(14), height: rem(14) }} />}>
          Restore
        </Menu.Item>

      </Menu.Dropdown>
    </Menu>
  )
}