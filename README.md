# 🖥️ {{project-name}}

{{description}}

## Features

- 🌐 **Cross-Platform**: Desktop (Windows, macOS, Linux) and Mobile (iOS, Android) support
- 🎨 **Custom Titlebar**: Native-feeling window controls
- 📥 **System Tray**: Background operation with menu
- 🔄 **Auto-Updater**: Built-in update mechanism
- 🔗 **IPC**: Communication between Rust and JavaScript
- 🧭 **TanStack Router**: Type-safe navigation
- 💨 **Tailwind CSS**: Utility-first styling

## Prerequisites

- [Rust](https://rustup.rs) 1.85+
- [Bun](https://bun.sh) 1.3+
- [Tauri CLI](https://v2.tauri.app/start/prerequisites/)

## Development

```sh
bun install
bun tauri dev
```

## Building

### Desktop

```sh
bun tauri build
```

### Mobile

```sh
# iOS (macOS only)
bun tauri ios init
bun tauri ios dev

# Android
bun tauri android init
bun tauri android dev
```

## License

The code in this repository is licensed under MIT, &copy; [Omni LLC](https://omni.dev). See [LICENSE.md](LICENSE.md) for more information.
