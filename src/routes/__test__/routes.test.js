import { render } from "@testing-library/react";
import Routes from "../index";

// Test suite fot Phone Number Component
describe("<Layout /> ", () => {
  let wrapper;
  let props = {
    children: <></>,
  };

  /**
   *  Runs before each test case execution usally done init code for
   *  test cases refer this https://jestjs.io/docs/en/setup-teardown
   * */
  beforeEach(() => {
    wrapper = render(<Routes {...props} />);
  });

  /**
   *  Test cases start here
   */
  it("should renders", () => {
    expect(wrapper).not.toBeNull();
  });

  it("should match Main snapshot", () => {
    wrapper = render(<Routes {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
