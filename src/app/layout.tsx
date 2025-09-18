import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/lib/query-provider";

export const metadata: Metadata = {
  title: "Coxwave test – Event Viewer",
  description: "Coxwave frontend test: 이벤트 로그 뷰어",
  applicationName: "Coxwave test",
  authors: [{ name: "Wonyoung Kim" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center">
        <div className="w-full max-w-6xl px-6">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
