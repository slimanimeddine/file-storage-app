import { SegmentedControl, Center, rem } from "@mantine/core"
import { IconLayoutGrid, IconLayoutRows } from "@tabler/icons-react"
import { SetStateAction } from "react"

type CustomSegmentedControlProps = {
  value: string,
  setValue: (value: SetStateAction<string>) => void
}

export default function CustomSegmentedControl({ value, setValue }: CustomSegmentedControlProps) {
  return (
    <SegmentedControl
      value={value}
      onChange={(val: string) => setValue(val)}
      data={[
        {
          value: "grid",
          label: (
            <Center style={{ gap: 10 }}>
              <IconLayoutGrid style={{ width: rem(16), height: rem(16) }} />
              <span>Grid</span>
            </Center>
          ),
        },
        {
          value: "table",
          label: (
            <Center style={{ gap: 10 }}>
              <IconLayoutRows style={{ width: rem(16), height: rem(16) }} />
              <span>Table</span>
            </Center>
          ),
        }
      ]}
    />
  )
}
