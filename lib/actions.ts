import {
  createProjectMutation,
  createUserMutation,
  getUserQuery,
} from "@/graphql";
import { ProjectForm, UserInterface } from "@/utils/interfaces";
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

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: {
        ...form,
        createdBy: {
          link: creatorId,
        },
        image: imageUrl.url,
      },
    };
    return makeGraphQLRequest(createProjectMutation, variables);
  }
};
