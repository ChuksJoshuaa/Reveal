"use client";

import { SessionInterface } from "@/utils/interfaces";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { FormField, CustomMenu, Button } from ".";
import { categoryFilters } from "@/utils/constants";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

const ProjectForm = ({
  type,
  session,
}: {
  type: string;
  session: SessionInterface;
}) => {
  let initialState = {
    image: "",
    title: "",
    description: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  };

  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken();
    let userId = session?.user?.id;

    try {
      if (type === "create") {
        await createNewProject(form, userId, token);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label className="flexCenter form_image-label" htmlFor="poster">
          {!form.image && "Choose a poster for your project"}
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          className="form_image-input"
          onChange={handleChangeImage}
        />

        {form?.image && (
          <Image
            src={form?.image}
            alt="Poster image"
            className="sm:p-10 object-contain z-20"
            fill
          />
        )}
      </div>

      <FormField
        title="title"
        state={form.title}
        placeholder="Reveal"
        setState={(value: string) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        isTextArea
        state={form.description}
        placeholder="Showcase and discover cool developer projects"
        setState={(value: string) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://chuks.vercel.app"
        setState={(value: string) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://github.com/ChuksJoshuaa"
        setState={(value: string) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        placeholder=""
        filters={categoryFilters}
        setState={(value: string) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Submitting" : "Updating"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          rightIcon={null}
          isSubmitting={isSubmitting}
          bgColor="bg-primary-purple"
          textColor={null}
          handleClick={handleFormSubmit}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
