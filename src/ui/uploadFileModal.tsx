import { Alert, Modal, TextInput, FileInput, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconUpload } from "@tabler/icons-react";

function CustomAlert({ text }: { text: string }) {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="blue" icon={icon}>
      {text}
    </Alert>
  );
}

export default function UploadFileModal() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal size="md" centered opened={opened} onClose={close} title={<h4>Upload Your File Here</h4>}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <CustomAlert text="This file will be accessible by anyone in your organization" />
          <TextInput
            label="Title"
            placeholder="Title"
          />

          <FileInput
            label="File"
            placeholder="No file selected"
            leftSection={<IconUpload />}
          />

          <Button>Submit</Button>
        </div>
      </Modal>

      <Button onClick={open}>Upload File</Button>
    </>
  )
}
