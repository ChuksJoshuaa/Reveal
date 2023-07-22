import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
  updateProjectMutation,
} from "@/graphql";
import { ProjectForm, UserInterface } from "@/utils/interfaces";
import { isBase64DataURL } from "@/utils/isImageBase";
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

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);

    let token = response.json();
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createNewProject = async (
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

export const fetchAllProjects = (category?: string, endcursor?: string) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(projectsQuery, { category, endcursor });
};

export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const deleteProject = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(deleteProjectMutation, { id, token });
};

export const updateProject = async (
  form: ProjectForm,
  projectId: string,
  token: string
) => {
  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: projectId,
    input: updatedForm,
  };

  return makeGraphQLRequest(updateProjectMutation, variables);
};
