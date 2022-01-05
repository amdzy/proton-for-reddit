import { useThemeStore } from "..";

describe("Theme store", () => {
  it("Change theme", () => {
    const setTheme = useThemeStore.getState().setTheme;
    setTheme("light");
    expect(useThemeStore.getState().theme).toBe("light");
  });

  it("Change theme color", () => {
    const theme = useThemeStore.getState().theme;
    const changeColor = useThemeStore.getState().changeColor;
    const color = "#000000";

    changeColor("primary", color);
    expect(useThemeStore.getState().colors[theme].primary).toBe(color);

    changeColor("background", color);
    expect(useThemeStore.getState().colors[theme].background).toBe(color);
  });

  it("Change font size", () => {
    const changeFontSize = useThemeStore.getState().changeFontSize;
    changeFontSize("header", 20);
    expect(useThemeStore.getState().fonts.fontSize.header).toBe(20);
  });

  it("Change font family", () => {
    const changeFontFamily = useThemeStore.getState().changeFontFamily;
    changeFontFamily("header", "noto");
    expect(useThemeStore.getState().fonts.fontFamily.header).toBe("noto");
  });
});
