import { DataTable } from "mantine-datatable";
import ActionsMenu from "./actionsMenu";
import dayjs from "dayjs"
import { useUser } from "@clerk/nextjs"
import { TFile } from "@/types"

export default function FilesTableView({ files }: { files: TFile[] | null | undefined }) {
  const user = useUser()

  if (!files) {
    return (
      <DataTable
        withTableBorder
        borderRadius="md"
        highlightOnHover
        minHeight={50}
        columns={[
          {
            accessor: "name",
          },
          {
            accessor: "type",
          },
          {
            accessor: "user",
          },
          {
            accessor: "uploadedOn",
          },
          {
            accessor: "actions",
          }
        ]}
        records={[]}
      />
    )
  }

  return (
    <DataTable
      withTableBorder
      borderRadius="md"
      highlightOnHover
      minHeight={50}
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
          render: () => user.user?.fullName
        },
        {
          accessor: "uploadedOn",
          render: (file) => `${dayjs(file._creationTime)}`
        },
        {
          accessor: "actions",
          render: (file) => (
            <ActionsMenu file={file} />
          )
        }
      ]}
      records={files}
    />
  )
}
