import { TanStackDevtools } from "@tanstack/react-devtools";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import Titlebar from "@/components/Titlebar";

/** @knipignore */
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Titlebar />

      <main className="main-content">
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
