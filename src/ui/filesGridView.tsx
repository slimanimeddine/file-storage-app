import { Avatar, Grid } from "@mantine/core"
import { IconPhoto } from "@tabler/icons-react"
import Image from "next/image"
import ActionsMenu from "./actionsMenu"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useOrganization, useUser } from "@clerk/nextjs"
import NoFilesUploaded from "./noFilesUploaded"
import { Doc } from "../../convex/_generated/dataModel"

function SingleFile({ file }: { file: Doc<"files"> }) {
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
          {file.name}
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
  const organization = useOrganization()
  const user = useUser()

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  if (!files?.length) {
    return <NoFilesUploaded />
  }

  return (
    <Grid>
      {files?.map(file => (
        <Grid.Col key={file._id} span={{ base: 12, md: 6, lg: 4 }}><SingleFile file={file} /></Grid.Col>
      ))}
    </Grid>
  )
}
