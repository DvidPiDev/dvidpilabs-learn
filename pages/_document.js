import { Html, Head, Main, NextScript } from "next/document";

export const metadata = {
  title: "DvidPiLabs learn.",
  description: "Helping teachers with AI, one by one.",
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
