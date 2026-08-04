import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

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
      className="dark antialiased scroll-smooth"
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
