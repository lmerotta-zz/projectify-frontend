import { computeProjectAbility } from "./computeAbility";

describe("Project management permissions", () => {
  const provider = [
    [
      "Project",
      "create",
      { PROJECT_VIEW_OWN: true, PROJECT_CREATE: true },
      {},
      true,
    ],
    [
      "Project without permission",
      "create",
      { PROJECT_VIEW_OWN: false, PROJECT_CREATE: false },
      {},
      false,
    ],
    [
      "same Project",
      "view",
      { PROJECT_VIEW_OWN: true, PROJECT_CREATE: true },
      { creator: { id: "1234" } },
      true,
    ],
    [
      "same Project without permission",
      "view",
      { PROJECT_VIEW_OWN: false, PROJECT_CREATE: true },
      { creator: { id: "1234" } },
      false,
    ],
    [
      "different Project with permission",
      "view",
      { PROJECT_VIEW_OWN: true, PROJECT_CREATE: true },
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
