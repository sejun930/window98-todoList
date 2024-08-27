import type { Metadata } from "next";
import "./globals.css";
import Layouts from "@/commons/layouts";

export const metadata: Metadata = {
  title: "Window 98 Todo-list",
  description: "Made By Sejun930",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Layouts>{children}</Layouts>
      </body>
    </html>
  );
}
