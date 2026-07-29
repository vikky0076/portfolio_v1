import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Syne, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vignesh-b.vercel.app'),
  title: "Vignesh B | Premium Software & AI Engineer Portfolio",
  description: "Professional portfolio of Vignesh B, B.Sc Computer Science student and Software Engineer specializing in full-stack web applications, machine learning models, and agentic workflows.",
  keywords: ["Vignesh B", "Software Engineer", "AI Engineer", "Full Stack Developer", "Machine Learning", "Portfolio", "Next.js", "React", "Takshashila University"],
  authors: [{ name: "Vignesh B" }],
  openGraph: {
    title: "Vignesh B | Software & AI Engineer Portfolio",
    description: "Premium portfolio of Vignesh B. Bridging the gap between cutting-edge AI systems and modern full-stack web architectures.",
    url: "https://vignesh-b.vercel.app",
    siteName: "Vignesh B Portfolio",
    images: [
      {
        url: "/assets/profile.png",
        width: 800,
        height: 1200,
        alt: "Vignesh B standing portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vignesh B | Software & AI Engineer Portfolio",
    description: "Premium portfolio of Vignesh B. Bridging the gap between cutting-edge AI systems and modern full-stack web architectures.",
    images: ["/assets/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${syne.variable} ${playfairDisplay.variable} dark antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-primary text-white selection:bg-accent/35 selection:text-white flex flex-col font-sans">
        <AuthProvider>
          <SmoothScroll>
            <CursorGlow />
            <ParticleBackground />
            <Navbar />
            <div className="flex-1 flex flex-col relative z-10">
              {children}
            </div>
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
