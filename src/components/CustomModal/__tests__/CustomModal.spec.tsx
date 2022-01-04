import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";
import { CustomModal } from "../CustomModal";

describe("CustomModal component", () => {
  let handleClose: () => void;
  let getByTestId: any;
  beforeEach(() => {
    handleClose = jest.fn();
    ({ getByTestId } = render(
      <CustomModal visible={true} onClose={handleClose}>
        <View></View>
      </CustomModal>
    ));
  });

  it("render", () => {
    expect(getByTestId("modal")).not.toBe(null);
  });

  it("close on click", () => {
    fireEvent.press(getByTestId("closeModal"));
    expect(handleClose).toBeCalled;
  });
});
