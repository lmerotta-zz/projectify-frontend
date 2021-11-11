import { computeUserAbility } from "./computeAbility";

describe("User management permissions", () => {
  const provider = [
    [
      "same user",
      "view",
      { USER_EDIT_SELF: true, USER_VIEW_SELF: true },
      { id: "1234" },
      true,
    ],
    [
      "same user without permission",
      "view",
      { USER_EDIT_SELF: true, USER_VIEW_SELF: false },
      { id: "1234" },
      false,
    ],
    [
      "different user",
      "view",
      { USER_EDIT_SELF: true, USER_VIEW_SELF: true },
      { id: "456" },
      false,
    ],
    [
      "same user",
      "edit",
      { USER_EDIT_SELF: true, USER_VIEW_SELF: true },
      { id: "1234" },
      true,
    ],
    [
      "same user without permission",
      "edit",
      { USER_EDIT_SELF: false, USER_VIEW_SELF: true },
      { id: "1234" },
      false,
    ],
    [
      "different user",
      "edit",
      { USER_EDIT_SELF: true, USER_VIEW_SELF: true },
      { id: "456" },
      false,
    ],
  ];

  it.each(provider)(
    "tests for %s, %s",
    (_, action: any, permissions, user: any, expected) => {
      const userId = "1234";

      const ability = computeUserAbility(permissions as any, userId);

      expect(ability.can(action, { ...user, __typename: "User" })).toBe(
        expected
      );
    }
  );
});
