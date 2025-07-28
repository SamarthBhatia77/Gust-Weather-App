import "./globals.css";
export const metadata = {
  title: "Gust",
  description: "Gust is a sleek and responsive weather application built using React, Next.js, and Tailwind CSS. It provides live weather updates such as temperature, wind speed, and status icons for cities worldwide  all presented in a clean, modern UI with smooth interactivity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
