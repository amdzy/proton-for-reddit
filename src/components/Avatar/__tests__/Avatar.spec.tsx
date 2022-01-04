import React from "react";
import { render } from "@testing-library/react-native";
import { Avatar } from "../Avatar";

describe("Avatar Component", () => {
  it("renders", () => {
    const { getByTestId } = render(<Avatar size={24} />);
    expect(getByTestId("avatar")).not.toBe(null);
  });

  it("renders with the correct style", () => {
    const size = 24;
    const { getByTestId } = render(<Avatar size={size} />);
    expect(getByTestId("avatar")).toHaveStyle({ width: size, height: size });
  });
});
