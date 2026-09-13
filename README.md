# ♉ Tauri Template

Cross-platform desktop and mobile application built with [Tauri](https://tauri.app).

## Features

- 🌐 **Cross-Platform**: Desktop (Windows, macOS, Linux) and Mobile (iOS, Android) support
- 🎨 **Custom Titlebar**: Native-feeling window controls
- 📥 **System Tray**: Background operation with menu
- 🔄 **Auto-Updater**: Built-in update mechanism (desktop)
- 📱 **Mobile Plugins**: Geolocation, notifications, deep links, and opener wired for iOS + Android
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

### Mobile (iOS + Android)

Mobile targets are wired in but not scaffolded: each project runs the platform
`init` once to generate the native project (Xcode/Gradle), then uses `dev` and
`build`. Icons are generated per-project from a source image (mobile needs the
Android mipmaps and iOS asset catalog), so run this after adding your icon:

```sh
bun tauri icon path/to/icon.png
```

```sh
# iOS (macOS only)
bun tauri:ios:init   # one-time, generates src-tauri/gen/apple
bun tauri:ios:dev    # run on simulator or device
bun tauri:ios:build

# Android
bun tauri:android:init   # one-time, generates src-tauri/gen/android
bun tauri:android:dev
bun tauri:android:build
```

Notes:

- The `windows` size in `src-tauri/tauri.conf.json` (`1200x800`) is a desktop
  concern; mobile runs fullscreen and ignores it. For a phone-shaped desktop
  preview during mobile work, set a portrait size such as `390x844`
- Deep links are configured under `plugins.deep-link` in
  `src-tauri/tauri.conf.json`. Replace the `{{project-name}}.omni.dev` universal
  link host and the `{{project-name}}` custom scheme with the real values
- Mobile permissions (geolocation, notification, opener, deep-link) live in
  `src-tauri/capabilities/mobile.json`; the updater and tray stay desktop-only
- The Content Security Policy in `security.csp` is a permissive starting point
  (allows `unsafe-inline` and broad `https:`/`wss:` origins) so the template
  runs out of the box. Tighten it per product: drop what your app does not need
  and pin real origins instead of inheriting the wide default

## License

The code in this repository is licensed under Apache 2.0, &copy; [Omni LLC](https://omni.dev). See [LICENSE.md](LICENSE.md) for more information.
