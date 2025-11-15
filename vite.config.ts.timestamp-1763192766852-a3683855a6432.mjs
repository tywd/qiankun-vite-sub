// vite.config.ts
import { defineConfig } from "file:///Users/shichuyu/Desktop/web/qoder/qiankun-vite-sub/node_modules/.pnpm/vite@5.4.21_@types+node@24.10.1_sass@1.94.0_terser@5.44.1/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/shichuyu/Desktop/web/qoder/qiankun-vite-sub/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vite@5.4.21_@types+node@24.10.1_sass@1.94.0_terser@5.44.1__vue@3.5.24_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";

// package.json
var name = "qiankun-vite-sub";

// vite.config.ts
import qiankun from "file:///Users/shichuyu/Desktop/web/qoder/qiankun-vite-sub/node_modules/.pnpm/vite-plugin-qiankun@1.0.15_typescript@5.4.5_vite@5.4.21_@types+node@24.10.1_sass@1.94.0_terser@5.44.1_/node_modules/vite-plugin-qiankun/dist/index.js";
var __vite_injected_original_dirname = "/Users/shichuyu/Desktop/web/qoder/qiankun-vite-sub";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    qiankun(name, {
      useDevMode: true
    })
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  },
  server: {
    port: 8082,
    host: "0.0.0.0",
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          "vue-vendor": ["vue", "vue-router"],
          "element-vendor": ["element-plus", "@element-plus/icons-vue"]
        }
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    minify: "terser"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NoaWNodXl1L0Rlc2t0b3Avd2ViL3FvZGVyL3FpYW5rdW4tdml0ZS1zdWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zaGljaHV5dS9EZXNrdG9wL3dlYi9xb2Rlci9xaWFua3VuLXZpdGUtc3ViL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zaGljaHV5dS9EZXNrdG9wL3dlYi9xb2Rlci9xaWFua3VuLXZpdGUtc3ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBuYW1lIH0gZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5pbXBvcnQgcWlhbmt1biBmcm9tICd2aXRlLXBsdWdpbi1xaWFua3VuJ1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBxaWFua3VuKG5hbWUsIHtcbiAgICAgIHVzZURldk1vZGU6IHRydWVcbiAgICB9KVxuICBdLFxuICBkZWZpbmU6IHtcbiAgICAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5OT0RFX0VOViksXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDgwODIsXG4gICAgaG9zdDogJzAuMC4wLjAnLFxuICAgIGNvcnM6IHRydWUsXG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgJ3Z1ZS12ZW5kb3InOiBbJ3Z1ZScsICd2dWUtcm91dGVyJ10sXG4gICAgICAgICAgJ2VsZW1lbnQtdmVuZG9yJzogWydlbGVtZW50LXBsdXMnLCAnQGVsZW1lbnQtcGx1cy9pY29ucy12dWUnXSxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNTAwLFxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgbWluaWZ5OiAndGVyc2VyJ1xuICB9XG59KSIsICJ7XG4gIFwibmFtZVwiOiBcInFpYW5rdW4tdml0ZS1zdWJcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZSAtLXBvcnQgODA4MiAtLWhvc3RcIixcbiAgICBcImJ1aWxkXCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3IC0tcG9ydCA4MDgyXCIsXG4gICAgXCJjbGVhblwiOiBcInJtIC1yZiBkaXN0IG5vZGVfbW9kdWxlcy8udml0ZVwiLFxuICAgIFwiYnVpbGQ6YW5hbHl6ZVwiOiBcInZpdGUgYnVpbGQgLS1tb2RlIGFuYWx5emVcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZVwiOiBcIl4yLjMuMlwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjQuMy4wXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjVcIixcbiAgICBcIkB2dWUvdHNjb25maWdcIjogXCJeMC41LjFcIixcbiAgICBcImVsZW1lbnQtcGx1c1wiOiBcIl4yLjExLjFcIixcbiAgICBcInBpbmlhXCI6IFwiXjMuMC40XCIsXG4gICAgXCJ0ZXJzZXJcIjogXCJeNS40My4xXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwifjUuNC41XCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4xMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tcWlhbmt1blwiOiBcIl4xLjAuMTBcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjUuMThcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC41LjFcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMi4wLjI5XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY3NzLWxvYWRlclwiOiBcIl43LjEuMlwiLFxuICAgIFwibmFub2lkXCI6IFwiXjUuMS42XCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuOTMuMlwiLFxuICAgIFwic2Fzcy1sb2FkZXJcIjogXCJeMTYuMC41XCIsXG4gICAgXCJzdHlsZS1sb2FkZXJcIjogXCJeNC4wLjBcIlxuICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF3VSxTQUFTLG9CQUFvQjtBQUNyVyxPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlOzs7QUNEdEIsV0FBUTs7O0FER1YsT0FBTyxhQUFhO0FBSnBCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFFBQVEsTUFBTTtBQUFBLE1BQ1osWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLHdCQUF3QixLQUFLLFVBQVUsUUFBUSxJQUFJLFFBQVE7QUFBQSxFQUM3RDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDLFNBQWlCLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osY0FBYyxDQUFDLE9BQU8sWUFBWTtBQUFBLFVBQ2xDLGtCQUFrQixDQUFDLGdCQUFnQix5QkFBeUI7QUFBQSxRQUM5RDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjO0FBQUEsSUFDZCx1QkFBdUI7QUFBQSxJQUN2QixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsRUFDVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
