import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import useTauri from "@/hooks/useTauri";
import useUpdater from "@/hooks/useUpdater";

/** @knipignore */
export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { greet, getSystemInfo, loading, error: tauriError } = useTauri();
  const {
    status,
    error: updateError,
    checkForUpdates,
    downloadAndInstall,
    restart,
  } = useUpdater();

  const [greeting, setGreeting] = useState("");
  const [systemInfo, setSystemInfo] = useState<{
    os: string;
    arch: string;
    family: string;
  } | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    getSystemInfo().then(setSystemInfo);
  }, [getSystemInfo]);

  const handleGreet = useCallback(async () => {
    const result = await greet(name || "World");
    setGreeting(result);
  }, [greet, name]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-zinc-950 p-8 text-zinc-100">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-bold text-3xl">{"{{project-name}}"}</h1>
          <p className="mt-2 text-zinc-400">
            Tauri v2 + React + TanStack Router
          </p>
        </div>

        {/* IPC Demo */}
        <div className="space-y-4 rounded-lg bg-zinc-900 p-6">
          <h2 className="font-semibold text-lg">IPC Demo</h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="flex-1 rounded bg-zinc-800 px-3 py-2 text-sm outline-none ring-1 ring-zinc-700 focus:ring-zinc-500"
            />
            <button
              type="button"
              onClick={handleGreet}
              disabled={loading}
              className="rounded bg-blue-600 px-4 py-2 font-medium text-sm hover:bg-blue-500 disabled:opacity-50"
            >
              Greet
            </button>
          </div>

          {greeting && (
            <p className="rounded bg-zinc-800 p-3 text-sm text-zinc-300">
              {greeting}
            </p>
          )}

          {tauriError && (
            <p className="rounded bg-red-900/50 p-3 text-red-300 text-sm">
              {tauriError}
            </p>
          )}
        </div>

        {/* System Info */}
        {systemInfo && (
          <div className="space-y-2 rounded-lg bg-zinc-900 p-6">
            <h2 className="font-semibold text-lg">System Info</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-zinc-400">OS:</span>
              <span>{systemInfo.os}</span>
              <span className="text-zinc-400">Arch:</span>
              <span>{systemInfo.arch}</span>
              <span className="text-zinc-400">Family:</span>
              <span>{systemInfo.family}</span>
            </div>
          </div>
        )}

        {/* Updater */}
        <div className="space-y-4 rounded-lg bg-zinc-900 p-6">
          <h2 className="font-semibold text-lg">Updates</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">Status: {status}</span>
              {status === "idle" && (
                <button
                  type="button"
                  onClick={checkForUpdates}
                  className="rounded bg-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-600"
                >
                  Check for Updates
                </button>
              )}
              {status === "available" && (
                <button
                  type="button"
                  onClick={downloadAndInstall}
                  className="rounded bg-green-600 px-3 py-1.5 text-sm hover:bg-green-500"
                >
                  Download & Install
                </button>
              )}
              {status === "ready" && (
                <button
                  type="button"
                  onClick={restart}
                  className="rounded bg-blue-600 px-3 py-1.5 text-sm hover:bg-blue-500"
                >
                  Restart
                </button>
              )}
            </div>

            {updateError && (
              <p className="rounded bg-red-900/50 p-3 text-red-300 text-sm">
                {updateError}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
