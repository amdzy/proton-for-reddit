import { render } from "@testing-library/react-native";
import { FilterListItem } from "../FiltersListItem";

describe("FilterListItem component", () => {
  let handleClick: jest.Mock;
  let getByText: any;

  beforeEach(() => {
    handleClick = jest.fn()(
      ({ getByText } = render(
        <FilterListItem text="listItem" onPress={handleClick} />
      ))
    );
  });

  it("renders with text", () => {
    expect(getByText("listItem")).not.toBe(null);
  });
});
