/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCurrentUser
// ====================================================

export interface getCurrentUser_currentUser {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
}

export interface getCurrentUser {
  currentUser: getCurrentUser_currentUser | null;
}
