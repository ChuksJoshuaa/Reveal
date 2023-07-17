import { getUserProjects } from "@/lib/actions";
import { RelatedProps, UserProfile } from "@/utils/interfaces";

const RelatedProjects = async ({ userId, projectId }: RelatedProps) => {
  const result = (await getUserProjects(userId)) as { user: UserProfile };

  const filteredProjects = result?.user?.projects?.edges.filter(
    (item) => item?.node?.id !== projectId
  );

  console.log(filteredProjects)

  return <div>RelatedProjects</div>;
};

export default RelatedProjects;
