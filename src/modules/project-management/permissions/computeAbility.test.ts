import { computeProjectAbility } from "./computeAbility";

describe("Project management permissions", () => {
  const provider = [
    [
      "same Project",
      "view-own",
      { PROJECT_VIEW_OWN: true },
      { creator: { id: "1234" } },
      true,
    ],
    [
      "same Project without permission",
      "view-own",
      { PROJECT_VIEW_OWN: false },
      { creator: { id: "1234" } },
      false,
    ],
    [
      "different Project with permission",
      "view-own",
      { PROJECT_VIEW_OWN: true },
      { creator: { id: "457" } },
      false,
    ],
  ];

  it.each(provider)(
    "tests for %s, %s",
    (_, action: any, permissions, project: any, expected) => {
      const userId = "1234";

      const ability = computeProjectAbility(permissions as any, userId);

      expect(ability.can(action, { ...project, __typename: "Project" })).toBe(
        expected
      );
    }
  );
});
