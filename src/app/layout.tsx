import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/lib/query-provider";

export const metadata: Metadata = {
  title: "Coxwave test – Event Viewer",
  description: "Coxwave frontend test: 이벤트 로그 뷰어",
  applicationName: "Coxwave test",
  authors: [{ name: "Wonyoung Kim" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-6xl">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
