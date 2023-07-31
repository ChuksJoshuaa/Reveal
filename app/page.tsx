import { Categories, Pagination, ProjectCard } from "@/components";
import { fetchAllProjects } from "@/lib/actions";
import {
  CategoryProps,
  ProjectInterface,
  ProjectSearch,
} from "@/utils/interfaces";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({
  searchParams: { category, endcursor },
}: CategoryProps) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];
  const pagination = data?.projectSearch?.pageInfo;

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">
          No projects found, go create some first
        </p>
      </section>
    );
  }

  return (
    <div className="flex-start paddings flex-col mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>

      <Pagination
        startCursor={pagination?.startCursor}
        endCursor={pagination?.endCursor}
        hasNextPage={pagination?.hasNextPage}
        hasPreviousPage={pagination?.hasPreviousPage}
      />
    </div>
  );
};

export default Home;
