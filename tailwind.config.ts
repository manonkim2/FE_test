import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
      },
      colors: {
        fontPrimary: "#333333",
        fontSecondary: "#58656F",
        fontTertiary: "#b6b3b3",
        bgPrimary: "#f5f5f5",
        white: "#ffffff",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        xxl: "32px",
      },
      fontSize: {
        xl: ["1.125rem", "1.5rem"],
        lg: ["1rem", "1.375rem"],
        base: ["0.875rem", "1.25rem"],
        sm: ["0.75rem", "1.125rem"],
        xs: ["0.625rem", "1rem"],
      },
    },
  },
  plugins: [],
};

export default config;
