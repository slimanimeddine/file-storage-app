import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Inter } from "next/font/google";
import RootLayout from "@/ui/rootLayout";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </MantineProvider>
  );
}