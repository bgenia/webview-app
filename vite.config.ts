import { defineConfig, Plugin } from "vite";
import preact from "@preact/preset-vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";

const cppHeaderByteEmbed: () => Plugin = () => {
  return {
    name: "vite:cpp-header-byte-embed",
    enforce: "post",
    async generateBundle(_, outBundle) {
      for (const bundle of Object.values(outBundle)) {
        if (bundle.type == "chunk") {
          continue
        }

        const fileName = `${bundle.fileName}.h`

        const namespaceName = `embed_${bundle.fileName.replaceAll(/[^\w\d]+/g, "_").toLowerCase()}`

        let bytes

        if (typeof bundle.source == "string") {
          const encoder = new TextEncoder()

          bytes = encoder.encode(bundle.source)
        } else {
          bytes = bundle.source
        }

        const source = `#include <cstdint>\nnamespace ${namespaceName} { constexpr const uint8_t data[] = {${bytes.join(",")}}; }`

        bundle.fileName = fileName
        bundle.source = source
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    viteSingleFile(),
    createHtmlPlugin({ minify: true }),
    cppHeaderByteEmbed()
  ],
  root: "src/web",
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: Infinity,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        dir: "build/web",
      },
    },
  },
});
