import { ProjectCard } from "@/components";
import { fetchAllProjects } from "@/lib/actions";
import { ProjectInterface, ProjectSearch } from "@/utils/interfaces";

const Home = async () => {
  const data = (await fetchAllProjects()) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text-center">
          No projects found, go create some first
        </p>
      </section>
    );
  }

  return (
    <div className="flex-start paddings flex-col mb-16">
      <h1>Categories</h1>

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
      <h1>Pagination</h1>
    </div>
  );
};

export default Home;
