import { zodResolver } from "@hookform/resolvers/zod";
import { useMantineTheme, TextInput, rem, ActionIcon } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  query: z.string()
    .min(0)
    .max(100),
})

type FormInput = z.infer<typeof formSchema>

type Props = {
  setQuery: Dispatch<SetStateAction<string>>
}

export default function SearchFilesInput({ setQuery }: Props) {
  const theme = useMantineTheme();
  const {
    handleSubmit,
    control,
    formState,
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    }
  })

  async function onSubmit(data: FormInput) {
    setQuery(data.query)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="query"
        control={control}
        render={({ field }) => (
          <TextInput
            radius="xl"
            size="md"
            placeholder="Search files"
            rightSectionWidth={42}
            leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            rightSection={
              <ActionIcon loading={formState.isSubmitting} disabled={formState.isSubmitting} type="submit" size={32} radius="xl" color={theme.primaryColor} variant="filled">
                <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
              </ActionIcon>
            }
            {...field}
            error={formState.errors.query?.message}
          />
        )}
      />
    </form>
  );
}
