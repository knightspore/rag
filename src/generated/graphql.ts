import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Cursor: any;
  Date: any;
  Datetime: any;
  JSON: any;
  Time: any;
  UUID: any;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']>;
  gt?: InputMaybe<Scalars['BigInt']>;
  gte?: InputMaybe<Scalars['BigInt']>;
  in?: InputMaybe<Array<Scalars['BigInt']>>;
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  neq?: InputMaybe<Scalars['BigInt']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  neq?: InputMaybe<Scalars['Date']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']>;
  gt?: InputMaybe<Scalars['Datetime']>;
  gte?: InputMaybe<Scalars['Datetime']>;
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  lt?: InputMaybe<Scalars['Datetime']>;
  lte?: InputMaybe<Scalars['Datetime']>;
  neq?: InputMaybe<Scalars['Datetime']>;
};

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
};

/** Boolean expression comparing fields on type "JSON" */
export type JsonFilter = {
  eq?: InputMaybe<Scalars['JSON']>;
  neq?: InputMaybe<Scalars['JSON']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the collection */
  deleteFromarticlesCollection: ArticlesDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromsubscriptionsCollection: SubscriptionsDeleteResponse;
  /** Adds one or more `articlesInsertResponse` records to the collection */
  insertIntoarticlesCollection?: Maybe<ArticlesInsertResponse>;
  /** Adds one or more `subscriptionsInsertResponse` records to the collection */
  insertIntosubscriptionsCollection?: Maybe<SubscriptionsInsertResponse>;
  /** Updates zero or more records in the collection */
  updatearticlesCollection: ArticlesUpdateResponse;
  /** Updates zero or more records in the collection */
  updatesubscriptionsCollection: SubscriptionsUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromarticlesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ArticlesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromsubscriptionsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<SubscriptionsFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoarticlesCollectionArgs = {
  objects: Array<ArticlesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntosubscriptionsCollectionArgs = {
  objects: Array<SubscriptionsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdatearticlesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ArticlesFilter>;
  set: ArticlesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatesubscriptionsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<SubscriptionsFilter>;
  set: SubscriptionsUpdateInput;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `articles` */
  articlesCollection?: Maybe<ArticlesConnection>;
  /** A pagable collection of type `subscriptions` */
  subscriptionsCollection?: Maybe<SubscriptionsConnection>;
};


/** The root type for querying data */
export type QueryArticlesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ArticlesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ArticlesOrderBy>>;
};


/** The root type for querying data */
export type QuerySubscriptionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<SubscriptionsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SubscriptionsOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']>;
  gt?: InputMaybe<Scalars['Time']>;
  gte?: InputMaybe<Scalars['Time']>;
  in?: InputMaybe<Array<Scalars['Time']>>;
  lt?: InputMaybe<Scalars['Time']>;
  lte?: InputMaybe<Scalars['Time']>;
  neq?: InputMaybe<Scalars['Time']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<Scalars['UUID']>>;
  neq?: InputMaybe<Scalars['UUID']>;
};

export type Articles = {
  __typename?: 'articles';
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Datetime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  is_read?: Maybe<Scalars['Boolean']>;
  pub_date: Scalars['Datetime'];
  subscription: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type ArticlesConnection = {
  __typename?: 'articlesConnection';
  edges: Array<ArticlesEdge>;
  pageInfo: PageInfo;
};

export type ArticlesDeleteResponse = {
  __typename?: 'articlesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Articles>;
};

export type ArticlesEdge = {
  __typename?: 'articlesEdge';
  cursor: Scalars['String'];
  node: Articles;
};

export type ArticlesFilter = {
  content?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  is_read?: InputMaybe<BooleanFilter>;
  pub_date?: InputMaybe<DatetimeFilter>;
  subscription?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type ArticlesInsertInput = {
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  is_read?: InputMaybe<Scalars['Boolean']>;
  pub_date?: InputMaybe<Scalars['Datetime']>;
  subscription?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ArticlesInsertResponse = {
  __typename?: 'articlesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Articles>;
};

export type ArticlesOrderBy = {
  content?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  is_read?: InputMaybe<OrderByDirection>;
  pub_date?: InputMaybe<OrderByDirection>;
  subscription?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
};

export type ArticlesUpdateInput = {
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  is_read?: InputMaybe<Scalars['Boolean']>;
  pub_date?: InputMaybe<Scalars['Datetime']>;
  subscription?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ArticlesUpdateResponse = {
  __typename?: 'articlesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Articles>;
};

export type Subscriptions = {
  __typename?: 'subscriptions';
  articles?: Maybe<Array<Maybe<Scalars['UUID']>>>;
  created_at?: Maybe<Scalars['Datetime']>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  muted: Scalars['Boolean'];
  title: Scalars['String'];
  updated_at?: Maybe<Scalars['Datetime']>;
  url: Scalars['String'];
  user: Scalars['UUID'];
};

export type SubscriptionsConnection = {
  __typename?: 'subscriptionsConnection';
  edges: Array<SubscriptionsEdge>;
  pageInfo: PageInfo;
};

export type SubscriptionsDeleteResponse = {
  __typename?: 'subscriptionsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Subscriptions>;
};

export type SubscriptionsEdge = {
  __typename?: 'subscriptionsEdge';
  cursor: Scalars['String'];
  node: Subscriptions;
};

export type SubscriptionsFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  icon?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  muted?: InputMaybe<BooleanFilter>;
  title?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  url?: InputMaybe<StringFilter>;
  user?: InputMaybe<UuidFilter>;
};

export type SubscriptionsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  muted?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['Datetime']>;
  url?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['UUID']>;
};

export type SubscriptionsInsertResponse = {
  __typename?: 'subscriptionsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Subscriptions>;
};

export type SubscriptionsOrderBy = {
  articles?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  icon?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  muted?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
  user?: InputMaybe<OrderByDirection>;
};

export type SubscriptionsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  muted?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['Datetime']>;
  url?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['UUID']>;
};

export type SubscriptionsUpdateResponse = {
  __typename?: 'subscriptionsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Subscriptions>;
};

export type GetArticlesFromSubscriptionsQueryVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetArticlesFromSubscriptionsQuery = { __typename?: 'Query', articlesCollection?: { __typename?: 'articlesConnection', edges: Array<{ __typename?: 'articlesEdge', node: { __typename?: 'articles', id: any, title: string, description?: string | null, url: string, pub_date: any, subscription: string, is_read?: boolean | null } }> } | null };

export type ReadArticleMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type ReadArticleMutation = { __typename?: 'Mutation', updatearticlesCollection: { __typename?: 'articlesUpdateResponse', affectedCount: number, records: Array<{ __typename?: 'articles', id: any }> } };

export type UpdateArticleMutationVariables = Exact<{
  url: Scalars['String'];
  article: ArticlesUpdateInput;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updatearticlesCollection: { __typename?: 'articlesUpdateResponse', records: Array<{ __typename?: 'articles', id: any, url: string, title: string, is_read?: boolean | null, pub_date: any, description?: string | null, subscription: string }> } };

export type GetSubscriptionsQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetSubscriptionsQuery = { __typename?: 'Query', subscriptionsCollection?: { __typename?: 'subscriptionsConnection', edges: Array<{ __typename?: 'subscriptionsEdge', node: { __typename?: 'subscriptions', id: any, title: string, icon?: string | null } }> } | null };

export type GetSubscriptionUrLsQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetSubscriptionUrLsQuery = { __typename?: 'Query', subscriptionsCollection?: { __typename?: 'subscriptionsConnection', edges: Array<{ __typename?: 'subscriptionsEdge', node: { __typename?: 'subscriptions', url: string } }> } | null };


export const GetArticlesFromSubscriptionsDocument = gql`
    query getArticlesFromSubscriptions($ids: [String!]!) {
  articlesCollection(
    filter: {subscription: {in: $ids}}
    orderBy: {pub_date: DescNullsLast}
  ) {
    edges {
      node {
        id
        title
        description
        url
        pub_date
        subscription
        is_read
      }
    }
  }
}
    `;

export function useGetArticlesFromSubscriptionsQuery(options: Omit<Urql.UseQueryArgs<GetArticlesFromSubscriptionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetArticlesFromSubscriptionsQuery, GetArticlesFromSubscriptionsQueryVariables>({ query: GetArticlesFromSubscriptionsDocument, ...options });
};
export const ReadArticleDocument = gql`
    mutation readArticle($id: UUID!) {
  updatearticlesCollection(set: {is_read: true}, filter: {id: {eq: $id}}) {
    affectedCount
    records {
      id
    }
  }
}
    `;

export function useReadArticleMutation() {
  return Urql.useMutation<ReadArticleMutation, ReadArticleMutationVariables>(ReadArticleDocument);
};
export const UpdateArticleDocument = gql`
    mutation updateArticle($url: String!, $article: articlesUpdateInput!) {
  updatearticlesCollection(set: $article, filter: {url: {eq: $url}}) {
    records {
      id
      url
      title
      is_read
      pub_date
      description
      subscription
    }
  }
}
    `;

export function useUpdateArticleMutation() {
  return Urql.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument);
};
export const GetSubscriptionsDocument = gql`
    query getSubscriptions($id: UUID!) {
  subscriptionsCollection(filter: {user: {eq: $id}}) {
    edges {
      node {
        id
        title
        icon
      }
    }
  }
}
    `;

export function useGetSubscriptionsQuery(options: Omit<Urql.UseQueryArgs<GetSubscriptionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>({ query: GetSubscriptionsDocument, ...options });
};
export const GetSubscriptionUrLsDocument = gql`
    query getSubscriptionURLs($id: UUID!) {
  subscriptionsCollection(filter: {user: {eq: $id}}) {
    edges {
      node {
        url
      }
    }
  }
}
    `;

export function useGetSubscriptionUrLsQuery(options: Omit<Urql.UseQueryArgs<GetSubscriptionUrLsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSubscriptionUrLsQuery, GetSubscriptionUrLsQueryVariables>({ query: GetSubscriptionUrLsDocument, ...options });
};