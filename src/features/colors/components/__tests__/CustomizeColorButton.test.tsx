import { fireEvent, render } from "@testing-library/react-native";
import { CustomizeColorButton } from "../CustomizeColorButton";

describe("CustomizeColorButton component", () => {
  let handlePress: jest.Mock;
  let getByTestId: any;
  let getByText: any;

  beforeEach(() => {
    handlePress = jest.fn()(
      ({ getByTestId, getByText } = render(
        <CustomizeColorButton
          text="button"
          color="#000000"
          onPress={handlePress}
        />
      ))
    );
  });

  it("renders", () => {
    expect(getByTestId("CustomizeColorButton")).not.toBe(null);
  });

  it("renders preview circle with correct color", () => {
    expect(getByTestId("previewCircle")).toHaveStyle({
      backgroundColor: "#000000",
    });
  });

  it("renders with correct text", () => {
    expect(getByText("button")).not.toBe(null);
  });

  it("handle press", () => {
    fireEvent.press(getByTestId("CustomizeColorButton"));
    expect(handlePress).toHaveBeenCalled;
  });
});
