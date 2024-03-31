import { DataTable } from "mantine-datatable";
import ActionsMenu from "./actionsMenu";

const records = [
  {
    name: "Document.pdf",
    type: "PDF",
    user: "John Doe",
    uploadedOn: "2021-09-01",

  },
  {
    name: "Spreadsheet.xlsx",
    type: "Excel",
    user: "Jane Doe",
    uploadedOn: "2021-09-01",
  },
  {
    name: "Presentation.ppt",
    type: "PowerPoint",
    user: "John Doe",
    uploadedOn: "2021-09-01",
  },
]

export default function FilesTableView() {
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
        { accessor: "uploadedOn" },
        {
          accessor: "actions",
          render: () => (
            <ActionsMenu />
          )
        }
      ]}
      records={records}
    />
  )
}
