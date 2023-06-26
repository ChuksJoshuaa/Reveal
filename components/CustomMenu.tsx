"use client";

import { CategoryInterface } from "@/utils/interfaces";
import { Fragment } from "react";
import { Menu } from "@headlessui/react";
import Image from "next/image";

const CustomMenu = ({ state, title, setState, filters }: CategoryInterface) => {
  return (
    <div className="flexStart flex-col w-full gap-7 relative">
      <label htmlFor="title" className="w-full text-gray-100">
        {title}
      </label>

      <Menu as="div" className="self-start relative">
        <div>
          <Menu.Button className="flexCenter custom_menu-btn">
            {state || "Select a category"}
            <Image
              src="/arrow-down.svg"
              width={10}
              height={5}
              className="w-auto h-auto"
              alt="Arrow down"
            />
          </Menu.Button>
        </div>
        <Menu.Items className="flexStart custom_menu-btn">
          {filters?.map((tag) => (
            <Menu.Item key={tag}>
              <button
                type="button"
                value={tag}
                className="custom_menu-item"
                onClick={(e) => setState(e.currentTarget.value)}
              ></button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CustomMenu;
