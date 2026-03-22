import { Outlet, createRootRoute } from "@tanstack/react-router";

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
    </>
  );
}
