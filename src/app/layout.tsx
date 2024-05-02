import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { Inter, Montserrat } from "next/font/google";

// export const metadata = {
//   title: "Create T3 App",
//   description: "Generated by create-t3-app",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" className={`${geist.variable} font-geist`}>
    <html lang="en" className={montserrat.className}>
      <body>
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
