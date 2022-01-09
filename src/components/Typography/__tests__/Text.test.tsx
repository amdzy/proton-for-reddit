import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "../Text";
import { useThemeStore } from "@/stores";

describe("Text component", () => {
  it("renders", () => {
    const { getByText } = render(<Text>Text</Text>);
    expect(getByText("Text")).not.toBe(null);
  });

  it("renders with the correct style", () => {
    const { getByText } = render(<Text>Text</Text>);
    const chosenTheme = useThemeStore.getState().theme;
    const theme = useThemeStore.getState().colors[chosenTheme];
    const fonts = useThemeStore.getState().fonts;
    expect(getByText("Text")).toHaveStyle({
      fontSize: fonts.fontSize.content,
      color: theme.text,
    });
  });
});
