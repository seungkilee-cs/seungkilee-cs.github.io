"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { Header } from "./Header";

export function ClientHeader() {
  const { toggleTheme, isDark } = useTheme();
  return <Header toggleTheme={toggleTheme} isDark={isDark} />;
}
