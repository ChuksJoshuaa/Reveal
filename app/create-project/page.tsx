import { Modal, ProjectForm } from "@/components";
import { getCurrentUser } from "@/lib/session";
import { SessionInterface } from "@/utils/interfaces";
import { redirect } from "next/navigation";

const CreateProject = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");
  return (
    <Modal>
      <h3 className="modal-head-text">Create a project</h3>
      <ProjectForm type="create" session={session as SessionInterface} />
    </Modal>
  );
};

export default CreateProject;
