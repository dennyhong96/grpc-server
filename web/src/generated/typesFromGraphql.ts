export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type House = {
  __typename?: 'House';
  address: HouseAddress;
  id: Scalars['Int'];
  isRental: Maybe<Scalars['Boolean']>;
  numberOfBedrooms: Scalars['Int'];
  onSale: Scalars['Boolean'];
  owner: Person;
  squarefeet: Scalars['Int'];
};

export type HouseAddress = {
  __typename?: 'HouseAddress';
  houseNumber: Scalars['String'];
  streetName: Scalars['String'];
};

export type Person = {
  __typename?: 'Person';
  firstname: Scalars['String'];
  fullname: Scalars['String'];
  houses: Maybe<Array<House>>;
  id: Scalars['Int'];
  lastname: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  houses: Array<House>;
  persons: Array<Person>;
};


export type QueryHousesArgs = {
  ids: Array<Scalars['Int']>;
};


export type QueryPersonsArgs = {
  ids: Array<Scalars['Int']>;
};

export type UserHouseQueryVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type UserHouseQuery = { __typename?: 'Query', houses: Array<{ __typename?: 'House', id: number, squarefeet: number, owner: { __typename?: 'Person', id: number, fullname: string } }> };
