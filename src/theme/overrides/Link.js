// ----------------------------------------------------------------------
import useSettings from "../../hooks/useSettings";
export default function Link() {
  const { themeMode } = useSettings();
  return {
    MuiLink: {
      defaultProps: {
        underline: "hover",

        color: themeMode === "dark" ? "white" : "black",
      },
    },
  };
}
