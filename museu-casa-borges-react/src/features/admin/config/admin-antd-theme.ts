import type { ThemeConfig } from "antd"

/** Alinhado a `--museu-red` em `globals.css` */
export const MUSEU_RED = "#d12424"
const MUSEU_RED_HOVER = "#b01e1e"
const MUSEU_RED_ACTIVE = "#941a1a"

export const adminAntdTheme: ThemeConfig = {
  token: {
    colorPrimary: MUSEU_RED,
    colorLink: MUSEU_RED,
    colorLinkHover: MUSEU_RED_HOVER,
    colorLinkActive: MUSEU_RED_ACTIVE,
    colorSuccess: "#16a34a",
    colorWarning: "#d97706",
    colorError: "#dc2626",
    colorBorder: "#e2e8f0",
    colorSplit: "#e2e8f0",
  },
  components: {
    Tabs: {
      inkBarColor: MUSEU_RED,
      itemSelectedColor: MUSEU_RED,
      itemHoverColor: MUSEU_RED_HOVER,
      itemActiveColor: MUSEU_RED,
    },
    Button: {
      primaryShadow: "0 2px 0 rgba(209, 36, 36, 0.06)",
      defaultHoverBorderColor: MUSEU_RED,
      defaultHoverColor: MUSEU_RED,
    },
    Input: {
      activeBorderColor: MUSEU_RED,
      hoverBorderColor: MUSEU_RED,
      activeShadow: `0 0 0 2px rgba(209, 36, 36, 0.12)`,
    },
    InputNumber: {
      activeBorderColor: MUSEU_RED,
      hoverBorderColor: MUSEU_RED,
    },
    Select: {
      optionSelectedBg: "rgba(209, 36, 36, 0.09)",
      optionActiveBg: "rgba(209, 36, 36, 0.06)",
    },
    Checkbox: {
      colorPrimary: MUSEU_RED,
    },
    Card: {
      colorBorderSecondary: "#e2e8f0",
    },
    Upload: {
      colorPrimary: MUSEU_RED,
    },
    Statistic: {
      colorTextDescription: "#64748b",
    },
    List: {
      colorSplit: "#e2e8f0",
    },
  },
}
