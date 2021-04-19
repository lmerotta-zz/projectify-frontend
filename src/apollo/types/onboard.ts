/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: onboard
// ====================================================

export interface onboard_onboardUser {
  __typename: "onboardUserPayload";
  clientMutationId: string | null;
}

export interface onboard {
  /**
   * Onboards a User.
   */
  onboardUser: onboard_onboardUser | null;
}

export interface onboardVariables {
  firstName: string;
  lastName: string;
  picture: any;
}
