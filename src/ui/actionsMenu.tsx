import { ActionIcon, Menu, rem, Text } from "@mantine/core"
import { IconDotsVertical, IconDownload, IconStar, IconTrash, IconArrowBack } from "@tabler/icons-react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import classes from "@/styles/uploadFile.module.css"
import { usePathname } from "next/navigation"
import { TFile } from "@/types"
import { Doc } from "../../convex/_generated/dataModel"
import { Protect } from "@clerk/nextjs"

function Delete({ file }: { file: TFile }) {
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

  return (
    <Protect
      role="org:admin"
      fallback={<></>}
    >
      <Menu.Item
        component="button"
        onClick={openModal}
        color="red"
        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
      >
        Delete
      </Menu.Item>
    </Protect>
  )
}

export default function ActionsMenu({ file, favorites }: { file: TFile, favorites: Doc<"favorites">[] | undefined }) {
  const pathname = usePathname()
  const pathnames = {
    files: "/dashboard/files",
    favorites: "/dashboard/favorites",
    trash: "/dashboard/trash",
  }

  const toggleFavorite = useMutation(api.files.toggleFavorite)
  const isFavorited = favorites?.some(f => f.fileId === file._id)

  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon variant="transparent" aria-label="Actions">
          <IconDotsVertical style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>

      </Menu.Target>

      <Menu.Dropdown>
        {/* download */}
        {pathname === pathnames.files && (
          <Menu.Item
            component="button"
            onClick={() => {
              if (!file.url) return
              window.open(file.url, "_blank")
            }}
            leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
          >
            Download
          </Menu.Item>
        )}

        {/* {pathname === pathnames.files && (
          <Menu.Item
            leftSection={<IconStar style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => {
              toggleFavorite({
                fileId: file._id
              })
            }}
          >
            Favorite
          </Menu.Item>
        )} */}

        {isFavorited ? (<Menu.Item
          leftSection={<IconStar style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => {
            toggleFavorite({
              fileId: file._id
            })
          }}
        >
          Unfavorite
        </Menu.Item>)
          : (<Menu.Item
            leftSection={<IconStar style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => {
              toggleFavorite({
                fileId: file._id
              })
            }}
          >
            Favorite
          </Menu.Item>)
        }

        {/* delete */}
        {(pathname === pathnames.files || pathname === pathnames.favorites) && (
          <Delete file={file} />
        )}

        {/* restore */}
        {pathname === pathnames.trash && (
          <Menu.Item color="green" leftSection={<IconArrowBack style={{ width: rem(14), height: rem(14) }} />}>
            Restore
          </Menu.Item>
        )}

      </Menu.Dropdown>
    </Menu>
  )
}