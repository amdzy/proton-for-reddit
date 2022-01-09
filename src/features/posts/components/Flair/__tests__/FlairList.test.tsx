import { render } from "@testing-library/react-native";
import { FlairList } from "../FlairList";

describe("FlairList Component", () => {
  it("renders", () => {
    const { getByText } = render(
      <FlairList tag="flair" color="light" bgColor="#FFFFFF" hint={undefined} />
    );
    expect(getByText("flair")).not.toBe(null);
  });

  it("renders link flair", () => {
    const { getByText } = render(
      <FlairList tag="flair" color="light" bgColor="#FFFFFF" hint="link" />
    );
    expect(getByText("Link")).not.toBe(null);
  });

  it("renders link flair & passed tag", () => {
    const { getByText } = render(
      <FlairList tag="flair" color="light" bgColor="#FFFFFF" hint="link" />
    );
    expect(getByText("flair")).not.toBe(null);
    expect(getByText("Link")).not.toBe(null);
  });

  it("renders nothing", () => {
    const { queryByText } = render(
      <FlairList
        tag={undefined}
        color="light"
        bgColor="#FFFFFF"
        hint={undefined}
      />
    );
    expect(queryByText("flair")).toBe(null);
    expect(queryByText("Link")).toBe(null);
  });
});
