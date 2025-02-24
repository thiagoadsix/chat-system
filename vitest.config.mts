import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    ...configDefaults,
    setupFiles: ["./vitest-setup.ts"],
    globals: true,
    watch: false,
    reporters: ["default", "hanging-process"],
    logHeapUsage: true,
    name: "chat-service",
    include: ["./__tests__/**/*.test.ts"],
    coverage: {
      ignoreEmptyLines: true,
      thresholds: {
        lines: 60,
        statements: 60,
        functions: 60,
        branches: 60,
        "src/domain/**": {
          lines: 80,
          statements: 80,
          functions: 80,
          branches: 80
        }
      },
      provider: "v8",
      reporter: ["text", "json-summary", "json", "html"],
      reportOnFailure: true,
      enabled: true,
      exclude: [
        "src/application/config/app.ts",
        "src/application/server.ts",
        "src/**/*.mock.ts",
        "src/**/index.ts",
        "node_modules/**",
        "**/node_modules/**",
        "**/*.response.ts",
        "**/*.request.ts",
        "**/*.interface.ts",
        "**/*.event.ts",
        "**/*.d.ts"
      ],
      include: ["src/**/*.ts"]
    },
    exclude: [...configDefaults.exclude]
  }
});
