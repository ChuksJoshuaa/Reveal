import { getUserProjects } from "@/lib/actions";
import {
  ProjectInterface,
  RelatedProps,
  UserProfile,
} from "@/utils/interfaces";
import Image from "next/image";
import Link from "next/link";

const RelatedProjects = async ({ userId, projectId }: RelatedProps) => {
  const result = (await getUserProjects(userId)) as { user: UserProfile };

  const filteredProjects = result?.user?.projects?.edges.filter(
    (item) => item?.node?.id !== projectId
  );

  if (filteredProjects.length === 0) return null;

  return (
    <div className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {result?.user?.name}</p>
        <Link
          href={`/profile/${result?.user?.id}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {filteredProjects.map((val, i) => (
          <div
            className="flexCenter related_project-card drop-shadow-card"
            key={i}
          >
            <Link
              href={`/project/${val?.node?.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={val?.node?.image}
                height={314}
                width={414}
                className="w-full h-full object-cover rounded-2xl"
                alt="project image"
              />

              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{val?.node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;
