import { GlobalStyles } from "twin.macro"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [(Story) => <><GlobalStyles /><Story /></>];
