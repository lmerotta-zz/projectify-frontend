// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { matchers } from "@emotion/jest";
import "@testing-library/jest-dom";

expect.extend(matchers);

jest.mock("i18next", () => ({
  ...jest.requireActual("i18next"),
  t: (str: any) => str,
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str: any) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  Trans: ({ i18nKey }: any) => i18nKey,
}));
