import Image from "next/image"

export default function NoFilesUploaded() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          marginTop: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image src={"/no_data.svg"} width={200} height={200} alt="no data" />
        <h3>You haven&apos;t uploaded any files yet</h3>
      </div>
    </div>
  )
}