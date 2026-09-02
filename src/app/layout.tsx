import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: {
    template: '%s | OmniviewEdu',
    default: 'OmniviewEdu | Premium School Management Platform',
  },
  description: 'A state-of-the-art, AI-powered platform for schools, teachers, parents, and students. Experience the future of education management.',
  keywords: ['School Management', 'EdTech', 'OmniviewEdu', 'AI Education', 'CBT Engine'],
  openGraph: {
    title: 'OmniviewEdu | The Future of School Management',
    description: 'Transform your school with AI-powered lesson notes, robust CBT engines, and seamless parent-teacher communication.',
    url: 'https://omniview.edu',
    siteName: 'OmniviewEdu',
    locale: 'en_US',
    type: 'website',
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FDFBF7] text-stone-900 selection:bg-stone-200">
        <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.03]"></div>
        {children}
      </body>
    </html>
  );
}
