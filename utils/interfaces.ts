import { User, Session } from "next-auth";

export type FormState = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface ProjectInterface {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedInUrl: string | null;
  projects: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export type UserInterface = {
  name: string;
  email: string;
  avatarUrl: string;
};

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

export interface FooterInterface {
  title: string;
  links: string[];
}

export type FormInterface = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

export interface CategoryInterface extends FormInterface {
  filters: string[];
}

export type ButtonInterface = {
  type?: "button" | "submit";
  title: string;
  isSubmitting?: boolean;
  leftIcon?: string | null;
  rightIcon?: string | null;
  bgColor?: string | null;
  textColor?: string | null;
};

export type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

export type Providers = Record<string, Provider>;

export type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export interface ProjectCardProps {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  userId: string;
  image: string;
}

export interface RelatedProps {
  userId: string;
  projectId: string;
}

export type CategoryProps = {
  searchParams: {
    category: string;
    endcursor?: string;
  };
};

export type PaginationProps = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export interface UserProfileProps {
  params: {
    id: string;
  };
}
