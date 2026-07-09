import type { Metadata } from "next";
import "./globals.css";
import { RecordsProvider } from "@/data/RecordsProvider";
import { CommunityProvider } from "@/data/CommunityProvider";

export const metadata: Metadata = {
  title: "人間力向上委員会 MVP",
  description: "TSUNAGU ら！ メンバーの振り返り・実践・シェアを記録するプロトタイプ"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <RecordsProvider>
          <CommunityProvider>{children}</CommunityProvider>
        </RecordsProvider>
      </body>
    </html>
  );
}
