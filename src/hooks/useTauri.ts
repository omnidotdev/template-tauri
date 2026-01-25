import { invoke } from "@tauri-apps/api/core";
import { useCallback, useState } from "react";

type SystemInfo = {
  os: string;
  arch: string;
  family: string;
};

/**
 * Hook for Tauri IPC commands.
 */
function useTauri() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const greet = useCallback(async (name: string): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const result = await invoke<string>("greet", { name });
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSystemInfo = useCallback(async (): Promise<SystemInfo> => {
    setLoading(true);
    setError(null);
    try {
      const result = await invoke<SystemInfo>("get_system_info");
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { greet, getSystemInfo, loading, error };
}

export default useTauri;
