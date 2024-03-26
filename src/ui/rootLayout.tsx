import Footer from "./footer";
import Header from "./header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
      justifyContent: "flex-start"
    }}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}