"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { IconSun, IconMoon } from "@tabler/icons-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="fixed top-4 left-4 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors z-50"
        aria-label="Toggle theme"
      >
        <IconSun className="w-5 h-5 text-primary" />
      </button>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 left-4 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors z-50"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <IconSun className="w-5 h-5 text-primary" />
      ) : (
        <IconMoon className="w-5 h-5 text-primary" />
      )}
    </motion.button>
  )
} 