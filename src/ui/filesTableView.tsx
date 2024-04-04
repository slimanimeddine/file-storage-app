import { DataTable } from "mantine-datatable";
import ActionsMenu from "./actionsMenu";
import dayjs from "dayjs"
import { useUser } from "@clerk/nextjs"
import { Doc } from "../../convex/_generated/dataModel";


type File = Doc<"files"> & { url: string | null }

export default function FilesTableView({ files }: { files: File[] | undefined }) {
  const user = useUser()
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
