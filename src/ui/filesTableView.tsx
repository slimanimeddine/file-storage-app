import { DataTable } from "mantine-datatable";
import ActionsMenu from "./actionsMenu";
import dayjs from "dayjs"
import { TFile } from "@/types"
import { Doc } from "../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function UserName({ file }: { file: TFile }) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId
  })

  return userProfile?.name
}

export default function FilesTableView({ files, favorites }: { files: TFile[] | null | undefined, favorites: Doc<"favorites">[] | undefined }) {

  if (!files) {
    return null
  }

  return (
    <DataTable
      withTableBorder
      borderRadius="md"
      highlightOnHover
      minHeight={150}
      columns={[
        {
          accessor: "name",
          render: (file) => file.name
        },
        {
          accessor: "type",
          render: (file) => file.type
        },
        {
          accessor: "user",
          render: (file) => UserName({ file })
        },
        {
          accessor: "uploadedOn",
          render: (file) => `${dayjs(file._creationTime)}`
        },
        {
          accessor: "actions",
          render: (file) => (
            <ActionsMenu favorites={favorites} file={file} />
          )
        }
      ]}
      records={files}
    />
  )
}
