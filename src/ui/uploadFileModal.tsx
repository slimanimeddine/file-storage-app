import { Alert, Modal, TextInput, FileInput, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconUpload } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import classes from "@/styles/uploadFile.module.css"
import { notifications } from "@mantine/notifications";

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
  const organization = useOrganization()
  const user = useUser()

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const createFile = useMutation(api.files.createFile);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const [opened, { open, close }] = useDisclosure(false);
  const {
    handleSubmit,
    control,
    formState,
    setValue,
    reset
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined
    }
  })

  async function onSubmit(data: FormInput) {
    if (!orgId) return;

    const postUrl = await generateUploadUrl()

    const fileType = data.file.type;

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": fileType },
      body: data.file,
    });

    const { storageId } = await result.json();

    try {
      await createFile({
        name: data.title,
        fileId: storageId,
        orgId
      })

      notifications.show({
        title: "File uploaded successfully",
        message: "Your file has been uploaded successfully!",
        classNames: classes,
      })

      reset()
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error uploading file",
        message: "There was an error uploading your file. Please try again.",
        classNames: classes,
      })
    }
  }
  return (
    <>
      <Modal size="md" centered opened={opened} onClose={() => {
        close();
        setValue("file", new File([], ""));
        setValue("title", "");
      }} title={<h4>Upload Your File Here</h4>}>
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
