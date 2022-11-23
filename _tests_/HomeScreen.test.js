import Home from "../screens/Home";

describe("Tests Home component", () => {
  test("renders correctly", () => {
    const tree = render(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("it should render right amount of elements", () => {
    const { getAllByText } = render(<Home />);
    const title = getAllByText("Your photos app");
    expect(title).toHaveLength(1);
    const fallBackText = getAllByText("No photos added yet !");
    expect(fallBackText).toHaveLength(1);
    const takePhotoButton = getAllByText("Take Photo");
    expect(takePhotoButton).toHaveLength(1);
    const uploadPhotoButton = getAllByText("Upload Photo");
    expect(uploadPhotoButton).toHaveLength(1);
  });
  test("buttons should be pressable", () => {
    const { getAllByText } = render(<Home />);
    const takePhotoButton = getAllByText("Take Photo");
    const uploadPhotoButton = getAllByText("Upload Photo");
    fireEvent.press(takePhotoButton);
    fireEvent.press(uploadPhotoButton);
  });
});
