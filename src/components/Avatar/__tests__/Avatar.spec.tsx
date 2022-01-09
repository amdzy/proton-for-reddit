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

  it("renders with image", () => {
    const { getByTestId } = render(
      <Avatar
        size={24}
        image="https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361513_960_720.jpg"
      />
    );
    expect(getByTestId("avatar")).not.toBe(null);
  });

  it("renders without placeholder", () => {
    const { getByTestId } = render(
      <Avatar size={24} showPlaceholder={false} />
    );
    expect(getByTestId("avatar")).not.toBe(null);
  });
});
