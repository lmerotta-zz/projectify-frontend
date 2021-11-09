import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` type represents a file to be uploaded in the same HTTP request as specified by [graphql-multipart-request-spec](https://github.com/jaydenseric/graphql-multipart-request-spec). */
  Upload: any;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  /** Creates a Project. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a User. */
  createUser?: Maybe<CreateUserPayload>;
  login?: Maybe<NoResponse>;
  /** Onboards a User. */
  onboardUser?: Maybe<OnboardUserPayload>;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};


export type MutationOnboardUserArgs = {
  input: OnboardUserInput;
};

export type NoResponse = {
  __typename: 'NoResponse';
  NoResponse?: Maybe<Scalars['String']>;
};

/** A node, according to the Relay specification. */
export type Node = {
  /** The id of this node. */
  id: Scalars['ID'];
};

export type Project = Node & {
  __typename: 'Project';
  createdAt: Scalars['String'];
  creator: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

/** Connection for Project. */
export type ProjectConnection = {
  __typename: 'ProjectConnection';
  edges?: Maybe<Array<Maybe<ProjectEdge>>>;
  pageInfo: ProjectPageInfo;
  totalCount: Scalars['Int'];
};

/** Edge of Project. */
export type ProjectEdge = {
  __typename: 'ProjectEdge';
  cursor: Scalars['String'];
  node?: Maybe<Project>;
};

/** Information about the current page. */
export type ProjectPageInfo = {
  __typename: 'ProjectPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename: 'Query';
  currentUser?: Maybe<User>;
  node?: Maybe<Node>;
  project?: Maybe<Project>;
  projects?: Maybe<ProjectConnection>;
  roles?: Maybe<RoleConnection>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryProjectArgs = {
  id: Scalars['ID'];
};


export type QueryProjectsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryRolesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Role = Node & {
  __typename: 'Role';
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions: UserPermissions;
};

/** Connection for Role. */
export type RoleConnection = {
  __typename: 'RoleConnection';
  edges?: Maybe<Array<Maybe<RoleEdge>>>;
  pageInfo: RolePageInfo;
  totalCount: Scalars['Int'];
};

/** Edge of Role. */
export type RoleEdge = {
  __typename: 'RoleEdge';
  cursor: Scalars['String'];
  node?: Maybe<Role>;
};

/** Information about the current page. */
export type RolePageInfo = {
  __typename: 'RolePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type User = Node & {
  __typename: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  /** Permission matrix. Available only for the currently logged in user */
  permissions?: Maybe<UserPermissions>;
  profilePictureUrl?: Maybe<Scalars['String']>;
  status: UserStatus;
};

/** Describes a users' permission matrix */
export type UserPermissions = {
  __typename: 'UserPermissions';
  PROJECT_CREATE: Scalars['Boolean'];
  PROJECT_VIEW_OWN: Scalars['Boolean'];
  USER_EDIT_SELF: Scalars['Boolean'];
  USER_VIEW_SELF: Scalars['Boolean'];
};

/** Describes a user status */
export enum UserStatus {
  Onboarded = 'ONBOARDED',
  SignedUp = 'SIGNED_UP',
  SignedUpOauth = 'SIGNED_UP_OAUTH'
}

export type CreateProjectInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateProjectPayload = {
  __typename: 'createProjectPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
};

export type CreateUserInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type CreateUserPayload = {
  __typename: 'createUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type OnboardUserInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  /** First name of the user */
  firstName: Scalars['String'];
  /** Last name of the user */
  lastName: Scalars['String'];
  /** Profile picture file */
  picture: Scalars['Upload'];
};

export type OnboardUserPayload = {
  __typename: 'onboardUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type GetCurrentUserPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserPermissionsQuery = { __typename: 'Query', currentUser?: { __typename: 'User', id: string, permissions?: { __typename: 'UserPermissions', USER_EDIT_SELF: boolean, USER_VIEW_SELF: boolean, PROJECT_VIEW_OWN: boolean, PROJECT_CREATE: boolean } | null | undefined } | null | undefined };

export type ListProjectsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
}>;


export type ListProjectsQuery = { __typename: 'Query', projects?: { __typename: 'ProjectConnection', totalCount: number, pageInfo: { __typename: 'ProjectPageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null | undefined, startCursor?: string | null | undefined }, edges?: Array<{ __typename: 'ProjectEdge', cursor: string, node?: { __typename: 'Project', id: string, name: string, description?: string | null | undefined, createdAt: string, creator: { __typename: 'User', id: string, firstName: string, lastName: string, profilePictureUrl?: string | null | undefined } } | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type ProjectFragmentFragment = { __typename: 'Project', id: string, name: string, description?: string | null | undefined, createdAt: string, creator: { __typename: 'User', id: string, firstName: string, lastName: string, profilePictureUrl?: string | null | undefined } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename: 'Mutation', login?: { __typename: 'NoResponse', NoResponse?: string | null | undefined } | null | undefined };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename: 'Mutation', createUser?: { __typename: 'createUserPayload', clientMutationId?: string | null | undefined } | null | undefined };

export type ProfileMenuItemQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileMenuItemQueryQuery = { __typename: 'Query', currentUser?: { __typename: 'User', id: string, profilePictureUrl?: string | null | undefined, firstName: string } | null | undefined };

export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on Project {
  id
  name
  description
  createdAt
  creator {
    id
    firstName
    lastName
    profilePictureUrl
  }
}
    `;
export const GetCurrentUserPermissionsDocument = gql`
    query getCurrentUserPermissions {
  currentUser {
    id
    permissions {
      USER_EDIT_SELF
      USER_VIEW_SELF
      PROJECT_VIEW_OWN
      PROJECT_CREATE
    }
  }
}
    `;

/**
 * __useGetCurrentUserPermissionsQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserPermissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserPermissionsQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>(GetCurrentUserPermissionsDocument, options);
      }
export function useGetCurrentUserPermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>(GetCurrentUserPermissionsDocument, options);
        }
export type GetCurrentUserPermissionsQueryHookResult = ReturnType<typeof useGetCurrentUserPermissionsQuery>;
export type GetCurrentUserPermissionsLazyQueryHookResult = ReturnType<typeof useGetCurrentUserPermissionsLazyQuery>;
export type GetCurrentUserPermissionsQueryResult = Apollo.QueryResult<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>;
export const ListProjectsDocument = gql`
    query ListProjects($first: Int, $last: Int, $before: String, $after: String) {
  projects(first: $first, last: $last, before: $before, after: $after) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    edges {
      cursor
      node {
        id
        ...ProjectFragment
      }
    }
  }
}
    ${ProjectFragmentFragmentDoc}`;

/**
 * __useListProjectsQuery__
 *
 * To run a query within a React component, call `useListProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProjectsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useListProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ListProjectsQuery, ListProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProjectsQuery, ListProjectsQueryVariables>(ListProjectsDocument, options);
      }
export function useListProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProjectsQuery, ListProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProjectsQuery, ListProjectsQueryVariables>(ListProjectsDocument, options);
        }
export type ListProjectsQueryHookResult = ReturnType<typeof useListProjectsQuery>;
export type ListProjectsLazyQueryHookResult = ReturnType<typeof useListProjectsLazyQuery>;
export type ListProjectsQueryResult = Apollo.QueryResult<ListProjectsQuery, ListProjectsQueryVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) @rest(type: "Login", path: "", endpoint: "login", method: "POST", bodyKey: "input") {
    NoResponse
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
  createUser(
    input: {email: $email, firstName: $firstName, lastName: $lastName, password: $password}
  ) {
    clientMutationId
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const ProfileMenuItemQueryDocument = gql`
    query ProfileMenuItemQuery {
  currentUser {
    id
    profilePictureUrl
    firstName
  }
}
    `;

/**
 * __useProfileMenuItemQueryQuery__
 *
 * To run a query within a React component, call `useProfileMenuItemQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileMenuItemQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileMenuItemQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileMenuItemQueryQuery(baseOptions?: Apollo.QueryHookOptions<ProfileMenuItemQueryQuery, ProfileMenuItemQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileMenuItemQueryQuery, ProfileMenuItemQueryQueryVariables>(ProfileMenuItemQueryDocument, options);
      }
export function useProfileMenuItemQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileMenuItemQueryQuery, ProfileMenuItemQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileMenuItemQueryQuery, ProfileMenuItemQueryQueryVariables>(ProfileMenuItemQueryDocument, options);
        }
export type ProfileMenuItemQueryQueryHookResult = ReturnType<typeof useProfileMenuItemQueryQuery>;
export type ProfileMenuItemQueryLazyQueryHookResult = ReturnType<typeof useProfileMenuItemQueryLazyQuery>;
export type ProfileMenuItemQueryQueryResult = Apollo.QueryResult<ProfileMenuItemQueryQuery, ProfileMenuItemQueryQueryVariables>;