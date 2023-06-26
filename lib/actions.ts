import { createUserMutation, getUserQuery } from "@/graphql";
import { UserInterface } from "@/utils/interfaces";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL!
  : process.env.NEXT_PUBLIC_GRAFBASE_LOCAL_API_URL!;

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY!
  : process.env.NEXT_PUBLIC_GRAFBASE_LOCAL_API_KEY!;

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

const client = new GraphQLClient(apiUrl);
const makeGraphQLRequest = async (query: string, variables: {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = (email: UserInterface["email"]) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (
  name: UserInterface["name"],
  email: UserInterface["email"],
  avatarUrl: UserInterface["avatarUrl"]
) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};
