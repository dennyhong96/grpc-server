import { GraphQLResolveInfo } from 'graphql';
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
  isRental?: Maybe<Scalars['Boolean']>;
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
  houses?: Maybe<Array<House>>;
  id: Scalars['Int'];
  lastname: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  houses: Array<House>;
  persons: Array<Person>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  House: ResolverTypeWrapper<Partial<House>>;
  HouseAddress: ResolverTypeWrapper<Partial<HouseAddress>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>;
  Person: ResolverTypeWrapper<Partial<Person>>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Partial<Scalars['Boolean']>;
  House: Partial<House>;
  HouseAddress: Partial<HouseAddress>;
  Int: Partial<Scalars['Int']>;
  Person: Partial<Person>;
  Query: {};
  String: Partial<Scalars['String']>;
};

export type HouseResolvers<ContextType = any, ParentType extends ResolversParentTypes['House'] = ResolversParentTypes['House']> = {
  address?: Resolver<ResolversTypes['HouseAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isRental?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  numberOfBedrooms?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  onSale?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Person'], ParentType, ContextType>;
  squarefeet?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HouseAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['HouseAddress'] = ResolversParentTypes['HouseAddress']> = {
  houseNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  houses?: Resolver<Maybe<Array<ResolversTypes['House']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  houses?: Resolver<Array<ResolversTypes['House']>, ParentType, ContextType>;
  persons?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  House?: HouseResolvers<ContextType>;
  HouseAddress?: HouseAddressResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

