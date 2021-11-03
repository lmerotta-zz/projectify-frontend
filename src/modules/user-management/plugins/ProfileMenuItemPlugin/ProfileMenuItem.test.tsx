import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "test-utils";
import AuthManager from "utils/AuthManager";
import ProfileMenuItem, { PROFILE_MENU_ITEM_QUERY } from "./ProfileMenuItem";

jest.mock("utils/AuthManager", () => ({
  logout: jest.fn(),
}));

describe('ProfileMenuItem unit tests', () => {
    it('Allowes the user to logout', async () => {
        const mocks = [
            {
              request: {
                query: PROFILE_MENU_ITEM_QUERY,
              },
              result: {
                  data: {
                      currentUser: {
                          id: '1234',
                          firstName: 'Test',
                          profilePictureUrl: null
                      }
                  }
              }
            },
          ];
      
        const { findByText, getByText } = renderWithProviders(<ProfileMenuItem />, { graphqlProps: { mocks } })

        const profileButton = await findByText("Test");

        userEvent.click(profileButton);
        userEvent.click(getByText("Logout"));

        expect(AuthManager.logout).toHaveBeenCalled();
    })
})