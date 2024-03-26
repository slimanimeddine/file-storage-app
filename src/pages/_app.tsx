import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";
import { Inter } from "next/font/google";
import Footer from "@/ui/footer";
import Header from "@/ui/header";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <div style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "flex-start"
      }}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </MantineProvider>
  );
}