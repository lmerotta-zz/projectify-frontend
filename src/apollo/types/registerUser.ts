/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: registerUser
// ====================================================

export interface registerUser_createUser {
  __typename: "createUserPayload";
  clientMutationId: string | null;
}

export interface registerUser {
  /**
   * Creates a User.
   */
  createUser: registerUser_createUser | null;
}

export interface registerUserVariables {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
