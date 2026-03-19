import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "KSP Δv Planner",
  description: "Plan your Kerbal Space Program missions with delta-v requirements",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Anti-flash: apply stored theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var n=localStorage.getItem('ksp-theme-name');var m=localStorage.getItem('ksp-theme-mode');var h=document.documentElement;var v=['interstellar','spacex','bladerunner','hitchhiker'];if(n&&v.indexOf(n)!==-1)h.classList.add('theme-'+n);var l;if(m==='light'){l=true;}else if(m==='dark'){l=false;}else{l=window.matchMedia('(prefers-color-scheme: light)').matches;}if(l)h.classList.add('light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
