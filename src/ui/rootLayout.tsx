import Footer from "./footer";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
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