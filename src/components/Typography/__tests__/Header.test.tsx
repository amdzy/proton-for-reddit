import React from "react";
import { render } from "@testing-library/react-native";
import { Header } from "../Header";
import { useThemeStore } from "@/stores";

describe("Header component", () => {
  it("renders", () => {
    const { getByText } = render(<Header>Header</Header>);
    expect(getByText("Header")).not.toBe(null);
  });

  it("renders with the correct style", () => {
    const { getByText } = render(<Header>Header</Header>);
    const chosenTheme = useThemeStore.getState().theme;
    const theme = useThemeStore.getState().colors[chosenTheme];
    const fonts = useThemeStore.getState().fonts;
    expect(getByText("Header")).toHaveStyle({
      fontSize: fonts.fontSize.header,
      color: theme.text,
    });
  });
});
