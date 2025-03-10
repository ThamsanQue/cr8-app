import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import CSS from "@/styles/globals.css?url";
import Navbar from "@/components/Navbar";
import { LogtoConfig, LogtoProvider } from "@logto/react";
import { isBrowser } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { WebSocketProvider } from "@/contexts/WebSocketContext";

const config: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APP_ID,
};

const LogtoWrapper = ({ children }: { children: ReactNode }) => {
  // FIXME: This is a temporary solution until we have a proper way to handle authentication in the Server.
  if (!isBrowser) {
    // Avoid initializing Logto during SSR
    return <>{children}</>;
  }

  return <LogtoProvider config={config}>{children}</LogtoProvider>;
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Cr8-xyz App",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: CSS,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <LogtoWrapper>
      <RootDocument>
        <WebSocketProvider>
          <Outlet />
        </WebSocketProvider>
      </RootDocument>
    </LogtoWrapper>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <Navbar />
        {children}
        <Toaster richColors closeButton position="top-right" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
