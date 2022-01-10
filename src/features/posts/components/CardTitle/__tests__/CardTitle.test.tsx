import { render } from "@testing-library/react-native";
import { CardTitle } from "../CardTitle";

describe("CardTitle component", () => {
  let getByTestId: any;
  let getByText: any;

  beforeEach(() => {
    ({ getByTestId, getByText } = render(
      <CardTitle
        title="Hello World"
        thumbnail=""
        showThumbnail={true}
        domain="test.com"
        showDomain={true}
      />
    ));
  });

  it("renders", () => {
    expect(getByTestId("CardTitle")).not.toBe(null);
  });

  it("renders all component", () => {
    expect(getByText("Hello World")).not.toBe(null);
    expect(getByText("test.com")).not.toBe(null);
  });
});
