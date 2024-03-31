import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";
import "@/styles/layout.css";
import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";
import { Inter } from "next/font/google";
import ConvexClientProvider from "@/ui/ConvexClienProvider";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  fontFamily: inter.style.fontFamily
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexClientProvider>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </ConvexClientProvider>
  );
}