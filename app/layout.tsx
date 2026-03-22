import { Geist, Geist_Mono, DM_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"
import content from "@/content/content.json"

const dmSans = DM_Sans({subsets:["latin"],variable:"--font-sans"})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Meta Pixel initialization
const tracking = (content as { tracking?: { fb_pixel_id?: string | null } }).tracking ?? {}
const fbPixelId =
  typeof tracking.fb_pixel_id === "string" && tracking.fb_pixel_id.trim() !== ""
    ? tracking.fb_pixel_id.trim()
    : null

const metaPixelScript =
  fbPixelId != null
    ? `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,"script",
"https://connect.facebook.net/en_US/fbevents.js");
fbq("init", "${fbPixelId}");
fbq("track", "PageView");`
    : null

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", dmSans.variable)}
    >
      <head>
        {metaPixelScript != null ? (
          <script dangerouslySetInnerHTML={{ __html: metaPixelScript }} />
        ) : null}
      </head>
      <body>
        {fbPixelId != null ? (
          <noscript>
            <img
              height={1}
              width={1}
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${encodeURIComponent(fbPixelId)}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        ) : null}
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}