import { ProfilePage } from "@/components";
import { getUserProjects } from "@/lib/actions";
import { UserProfile, UserProfileProps } from "@/utils/interfaces";

const UserProfile = async ({ params }: UserProfileProps) => {
  const limit = 100;
  const result = (await getUserProjects(params.id, limit)) as {
    user: UserProfile;
  } 

  if (!result.user)
    return <p className="no-result-text">Failed to fetch user info</p>;

    return <ProfilePage user={result?.user}  />;
};

export default UserProfile;
