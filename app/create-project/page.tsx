import { Modal, ProjectForm } from "@/components";

const CreateProject = () => {
  return (
    <Modal>
      <h3 className="modal-head-text">Create a project</h3>
      <ProjectForm />
    </Modal>
  );
};

export default CreateProject;
