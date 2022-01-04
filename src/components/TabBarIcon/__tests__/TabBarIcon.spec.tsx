import React from "react";
import { render } from "@testing-library/react-native";
import { TabBarIcon } from "../TabBarIcon";

describe("tabBarIcon component", () => {
  it("renders", async () => {
    const { findByTestId } = render(
      <TabBarIcon icon="test-tube" color="black" size={24} />
    );
    expect(await findByTestId("icon")).not.toBe(null);
  });
});
