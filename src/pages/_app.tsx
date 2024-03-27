import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";
import "@/styles/layout.css";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider, createTheme } from "@mantine/core";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  fontFamily: inter.style.fontFamily
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </ClerkProvider>
  );
}