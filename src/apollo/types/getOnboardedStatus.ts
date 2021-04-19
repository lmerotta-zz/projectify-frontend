/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOnboardedStatus
// ====================================================

export interface getOnboardedStatus_currentUser {
  __typename: "User";
  id: string;
  status: UserStatus;
}

export interface getOnboardedStatus {
  currentUser: getOnboardedStatus_currentUser | null;
}
