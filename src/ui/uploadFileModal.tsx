import { Alert, Modal, TextInput, FileInput, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconUpload } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string({
    required_error: "Title is required"
  })
    .min(1)
    .max(100),
  file: z
    .custom<File>((val) => val instanceof File, "File is required")
})

type FormInput = z.infer<typeof formSchema>

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
  const {
    handleSubmit,
    control,
    formState,
    reset
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined
    }
  })

  async function onSubmit(data: FormInput) {
    console.log(data.file)
    reset()
  }

  return (
    <>
      <Modal size="md" centered opened={opened} onClose={close} title={<h4>Upload Your File Here</h4>}>
        <form onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <CustomAlert text="This file will be accessible by anyone in your organization" />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Title"
                placeholder="Title"
                {...field}
                error={formState.errors.title?.message}
              />
            )}
          />

          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <FileInput
                label="File"
                placeholder="No file selected"
                leftSection={<IconUpload />}
                {...field}
                error={formState.errors.file?.message}
              />
            )}
          />

          <Button loading={formState.isSubmitting} disabled={formState.isSubmitting} type="submit">Submit</Button>
        </form>
      </Modal>

      <Button onClick={open}>Upload File</Button>
    </>
  )
}
