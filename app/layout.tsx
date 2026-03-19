import type { Metadata } from "next";
import {
  Space_Grotesk,
  Space_Mono,
  Barlow_Condensed,
  Cinzel,
  Playfair_Display,
  Nunito,
} from "next/font/google";
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

/** SpaceX — clean condensed technical sans */
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

/** Blade Runner headings — classical engraved Roman */
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});

/** Blade Runner body — editorial Victorian serif */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-playfair",
});

/** Hitchhiker's Guide — friendly rounded */
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
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
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} ${barlowCondensed.variable} ${cinzel.variable} ${playfairDisplay.variable} ${nunito.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
