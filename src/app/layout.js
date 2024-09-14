import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Header from "../components/Header.jsx"
import NextTopLoader from "nextjs-toploader";
import NewHeader from "@/components/new_header";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <NextTopLoader
          color="#20b2aa"
          className="rounded-full"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NewHeader/>
          
          <div className="overflow-hidden relative top-[65px]">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
