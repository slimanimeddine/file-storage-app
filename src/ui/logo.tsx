import { IconFiles } from "@tabler/icons-react"

export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
        textDecorationLine: "none",
      }}
    >
      <IconFiles color="black" />
      <h1 style={{
        fontSize: "24px",
        fontWeight: "bold",
        color: "black",
        textDecorationLine: "none",
        textDecoration: "none"
      }}>FireFile</h1>
    </div>
  )
}