import type { Metadata } from "next";
import "./globals.css";
import Layouts from "@/commons/layouts";
import SettingsReactQuery from "@/commons/settings/react-query";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Window 98 Todo-list",
  description: "Made By Sejun930",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactNode {
  return (
    <html lang="ko">
      <body>
        <SettingsReactQuery>
          <Layouts>{children}</Layouts>
        </SettingsReactQuery>
      </body>
    </html>
  );
}
