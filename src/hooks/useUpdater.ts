import { relaunch } from "@tauri-apps/plugin-process";
import { check } from "@tauri-apps/plugin-updater";
import { useCallback, useState } from "react";

type UpdateStatus = "idle" | "checking" | "available" | "downloading" | "ready";

/**
 * Hook for auto-updater functionality.
 */
function useUpdater() {
  const [status, setStatus] = useState<UpdateStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const checkForUpdates = useCallback(async () => {
    setStatus("checking");
    setError(null);

    try {
      const update = await check();

      if (update) {
        setStatus("available");
        return update;
      }

      setStatus("idle");
      return null;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setStatus("idle");
      return null;
    }
  }, []);

  const downloadAndInstall = useCallback(async () => {
    setStatus("checking");
    setError(null);

    try {
      const update = await check();

      if (!update) {
        setStatus("idle");
        return;
      }

      setStatus("downloading");

      let downloaded = 0;
      let total = 0;

      await update.downloadAndInstall((event) => {
        if (event.event === "Started" && event.data.contentLength) {
          total = event.data.contentLength;
        } else if (event.event === "Progress") {
          downloaded += event.data.chunkLength;
          if (total > 0) {
            setProgress(Math.round((downloaded / total) * 100));
          }
        }
      });

      setStatus("ready");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setStatus("idle");
    }
  }, []);

  const restart = useCallback(async () => {
    await relaunch();
  }, []);

  return {
    status,
    progress,
    error,
    checkForUpdates,
    downloadAndInstall,
    restart,
  };
}

export default useUpdater;
