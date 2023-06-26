"use client";

import { SessionInterface } from "@/utils/interfaces";
import Image from "next/image";
import { ChangeEvent, FormEvent } from "react";
import { FormField, CustomMenu } from ".";
import { categoryFilters } from "@/utils/constants";

const ProjectForm = ({
  type,
  session,
}: {
  type: string;
  session: SessionInterface;
}) => {
  const form = {
    image: "",
    title: "",
    description: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  };
  const image = null;
  const handleFormSubmit = (e: FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleStateChange = (fieldName: string, value: string) => {};
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
        <button>Create</button>
      </div>
    </form>
  );
};

export default ProjectForm;
