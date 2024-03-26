import { DataTable } from "mantine-datatable";

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
        { accessor: "uploaded on" },
        { accessor: "actions" }
      ]}
      records={[]}
    />
  )
}
