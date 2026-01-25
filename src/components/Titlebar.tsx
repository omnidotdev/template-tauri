import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, Square, X } from "lucide-react";
import { useCallback } from "react";

/**
 * Custom titlebar with window controls.
 */
function Titlebar() {
  const appWindow = getCurrentWindow();

  const handleMinimize = useCallback(() => {
    appWindow.minimize();
  }, [appWindow]);

  const handleMaximize = useCallback(() => {
    appWindow.toggleMaximize();
  }, [appWindow]);

  const handleClose = useCallback(() => {
    appWindow.close();
  }, [appWindow]);

  return (
    <div className="titlebar">
      <div className="flex items-center gap-2 px-3">
        <span className="font-medium text-sm text-zinc-300">
          {"{{project-name}}"}
        </span>
      </div>

      <div className="titlebar-drag" data-tauri-drag-region />

      <div className="titlebar-controls">
        <button
          type="button"
          className="titlebar-button"
          onClick={handleMinimize}
          aria-label="Minimize"
        >
          <Minus size={16} />
        </button>
        <button
          type="button"
          className="titlebar-button"
          onClick={handleMaximize}
          aria-label="Maximize"
        >
          <Square size={14} />
        </button>
        <button
          type="button"
          className="titlebar-button close"
          onClick={handleClose}
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default Titlebar;
