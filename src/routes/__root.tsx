import { TanStackDevtools } from "@tanstack/react-devtools";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import LandscapeGate from "@/components/LandscapeGate";
import Titlebar from "@/components/Titlebar";
import { isTauri } from "@/lib/tauri";

/** @knipignore */
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <LandscapeGate />

      {/* The custom titlebar drives the native window, which only exists in
          the desktop shell */}
      {isTauri() && <Titlebar />}

      <main className={isTauri() ? "main-content" : "min-h-screen"}>
        <Outlet />
      </main>

      {import.meta.env.DEV && (
        <TanStackDevtools
          plugins={[
            {
              name: "Router",
              render: <TanStackRouterDevtoolsPanel />,
              defaultOpen: true,
            },
          ]}
        />
      )}
    </>
  );
}
