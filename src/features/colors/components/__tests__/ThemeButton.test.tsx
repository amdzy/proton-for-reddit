import { useThemeStore } from "@/stores";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeButton } from "../..";

describe("ThemeButton component", () => {
  it("renders", () => {
    const { getByTestId } = render(<ThemeButton theme="dark" active={false} />);
    expect(getByTestId("ThemeButton")).not.toBe(null);
  });

  it("renders with correct background color", () => {
    const { getByTestId } = render(<ThemeButton theme="dark" active={false} />);
    const theme = useThemeStore.getState().colors.dark;
    expect(getByTestId("ThemeButton")).toHaveStyle({
      backgroundColor: theme.background,
    });
  });

  it("Have border when active", () => {
    const { getByTestId } = render(<ThemeButton theme="dark" active={true} />);
    const theme = useThemeStore.getState().colors.dark;
    expect(getByTestId("ThemeButton")).toHaveStyle({
      borderColor: theme.primary,
    });
  });

  it("Change theme on press", () => {
    const { getByTestId } = render(<ThemeButton theme="light" active={true} />);
    fireEvent.press(getByTestId("ThemeButton"));
    const theme = useThemeStore.getState().theme;
    expect(theme).toBe("light");
  });
});
