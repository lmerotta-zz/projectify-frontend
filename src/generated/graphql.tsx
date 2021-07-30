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
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
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
  __typename?: 'NoResponse';
  NoResponse?: Maybe<Scalars['String']>;
};

/** A node, according to the Relay specification. */
export type Node = {
  /** The id of this node. */
  id: Scalars['ID'];
};

export type Project = Node & {
  __typename?: 'Project';
  id: Scalars['ID'];
  name: Scalars['String'];
  creator: User;
};

/** Connection for Project. */
export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  edges?: Maybe<Array<Maybe<ProjectEdge>>>;
  pageInfo: ProjectPageInfo;
  totalCount: Scalars['Int'];
};

/** Edge of Project. */
export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  node?: Maybe<Project>;
  cursor: Scalars['String'];
};

/** Information about the current page. */
export type ProjectPageInfo = {
  __typename?: 'ProjectPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  startCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  currentUser?: Maybe<User>;
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
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryRolesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
};

export type Role = Node & {
  __typename?: 'Role';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Connection for Role. */
export type RoleConnection = {
  __typename?: 'RoleConnection';
  edges?: Maybe<Array<Maybe<RoleEdge>>>;
  pageInfo: RolePageInfo;
  totalCount: Scalars['Int'];
};

/** Edge of Role. */
export type RoleEdge = {
  __typename?: 'RoleEdge';
  node?: Maybe<Role>;
  cursor: Scalars['String'];
};

/** Information about the current page. */
export type RolePageInfo = {
  __typename?: 'RolePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  startCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};


export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  profilePictureUrl?: Maybe<Scalars['String']>;
  status: UserStatus;
};

/** Describes a user status */
export enum UserStatus {
  SignedUp = 'SIGNED_UP',
  SignedUpOauth = 'SIGNED_UP_OAUTH',
  Onboarded = 'ONBOARDED'
}

export type CreateProjectInput = {
  name: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateProjectPayload = {
  __typename?: 'createProjectPayload';
  project?: Maybe<Project>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<User>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OnboardUserInput = {
  /** Profile picture file */
  picture: Scalars['Upload'];
  /** First name of the user */
  firstName: Scalars['String'];
  /** Last name of the user */
  lastName: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OnboardUserPayload = {
  __typename?: 'onboardUserPayload';
  user?: Maybe<User>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'NoResponse' }
    & Pick<NoResponse, 'NoResponse'>
  )> }
);

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'createUserPayload' }
    & Pick<CreateUserPayload, 'clientMutationId'>
  )> }
);

export type OnboardMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  picture: Scalars['Upload'];
}>;


export type OnboardMutation = (
  { __typename?: 'Mutation' }
  & { onboardUser?: Maybe<(
    { __typename?: 'onboardUserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'status' | 'profilePictureUrl'>
    )> }
  )> }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'status'>
  )> }
);


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
export const OnboardDocument = gql`
    mutation onboard($firstName: String!, $lastName: String!, $picture: Upload!) {
  onboardUser(
    input: {picture: $picture, firstName: $firstName, lastName: $lastName}
  ) {
    user {
      id
      status
      profilePictureUrl
    }
  }
}
    `;
export type OnboardMutationFn = Apollo.MutationFunction<OnboardMutation, OnboardMutationVariables>;

/**
 * __useOnboardMutation__
 *
 * To run a mutation, you first call `useOnboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOnboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [onboardMutation, { data, loading, error }] = useOnboardMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useOnboardMutation(baseOptions?: Apollo.MutationHookOptions<OnboardMutation, OnboardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OnboardMutation, OnboardMutationVariables>(OnboardDocument, options);
      }
export type OnboardMutationHookResult = ReturnType<typeof useOnboardMutation>;
export type OnboardMutationResult = Apollo.MutationResult<OnboardMutation>;
export type OnboardMutationOptions = Apollo.BaseMutationOptions<OnboardMutation, OnboardMutationVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  currentUser {
    id
    firstName
    lastName
    status
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;