import { ProjectCardProps } from "@/utils/interfaces";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({
  id,
  name,
  title,
  avatarUrl,
  userId,
  image,
}: ProjectCardProps) => {
  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          width={414}
          height={314}
          className="w-full h-full object-cover rounded-2xl"
          alt="Project Image"
        />

        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="profile image"
            />
            <p className="text-md">{name}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src="/hearth.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">525</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="/eye.svg" width={13} height={12} alt="eye" />
            <p className="text-sm">1.2k</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
