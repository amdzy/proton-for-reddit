import React from "react";
import { render } from "@testing-library/react-native";
import { SettingsHeader } from "../SettingsHeader";

describe("SettingsHeader component", () => {
  it("renders", () => {
    const { getByText } = render(<SettingsHeader text="header" />);
    expect(getByText("header")).not.toBe(null);
  });

  it("renders with the correct style", () => {
    const { getByText } = render(<SettingsHeader text="header" />);
    expect(getByText("header")).toHaveStyle({ fontSize: 16, padding: 12 });
  });

  it("override the style", () => {
    const { getByText } = render(
      <SettingsHeader text="header" style={{ fontSize: 20 }} />
    );
    expect(getByText("header")).toHaveStyle({ fontSize: 20 });
  });
});
