// Konfigurasi Vite standar untuk TanStack Start.
//
// Catatan: versi sebelumnya memakai paket internal milik Lovable
// (@lovable.dev/vite-tanstack-config) yang otomatis menyesuaikan diri kalau
// dijalankan di platform Lovable. Di luar platform itu (misalnya saat
// di-build di Vercel), paket tersebut menonaktifkan beberapa plugin penting
// (termasuk Nitro) sehingga build gagal. Konfigurasi di bawah ini memakai
// plugin resmi TanStack Start secara langsung, supaya project bisa di-build
// dan dijalankan di hosting mana saja (Vercel, Netlify, Cloudflare, dll).
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // Server entry kustom (src/server.ts) menangani pembungkus error
      // halaman gagal ("MUAT ULANG") sebelum permintaan diteruskan ke
      // TanStack Start.
      server: { entry: "server" },
    }),
    // Nitro otomatis mendeteksi platform deploy (Vercel, Cloudflare, Netlify,
    // Node biasa, dst) lewat variabel lingkungan yang disuntikkan platform
    // tersebut saat proses build, jadi tidak perlu preset tetap di sini.
    nitro(),
    viteReact(),
  ],
});
