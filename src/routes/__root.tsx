import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Titlebar from "@/components/Titlebar";

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

      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
