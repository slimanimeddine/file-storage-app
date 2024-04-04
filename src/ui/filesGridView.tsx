import { Avatar, Grid, Loader } from "@mantine/core"
import { IconCsv, IconPdf, IconPhoto } from "@tabler/icons-react"
import Image from "next/image"
import ActionsMenu from "./actionsMenu"
import NoFilesUploaded from "./noFilesUploaded"
import { Doc } from "../../convex/_generated/dataModel"
import { ReactNode } from "react"

type File = Doc<"files"> & { url: string | null }

function SingleFile({ file }: { file: File }) {
  const typeIcons = {
    image: <IconPhoto />,
    pdf: <IconPdf />,
    csv: <IconCsv />
  } as Record<Doc<"files">["type"], ReactNode>

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
          {typeIcons[file.type]}
          {file.name}
        </span>
        <ActionsMenu file={file} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}>

        {file.type === "image" && file.url && (
          <Image
            style={{
              objectFit: "contain",
            }}
            src={file.url ?? ""}
            width={100}
            height={200}
            alt={file.name}
          />
        )}

        {file.type === "pdf" && (
          <IconPdf style={{
            width: 100,
            height: 200,
          }} />
        )}

        {file.type === "csv" && (
          <IconCsv style={{
            width: 100,
            height: 200,
          }} />
        )}
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


export default function FilesGridView({ files }: { files: File[] | undefined }) {
  const isLoading = files === undefined;

  return (
    <>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loader mt={100} color="blue" size="xl" />
        </div>
      )}
      {files && files.length === 0 && <NoFilesUploaded />}
      {files && files.length > 0 && (
        <Grid>
          {files?.map(file => (
            <Grid.Col key={file._id} span={{ base: 12, md: 6, lg: 4 }}><SingleFile file={file} /></Grid.Col>
          ))}
        </Grid>
      )}
    </>
  )
}
