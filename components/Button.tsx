"use client";

import { ButtonInterface } from "@/utils/interfaces";
import Image from "next/image";
import { MouseEventHandler } from "react";

interface IIProps extends ButtonInterface {
  handleClick?: MouseEventHandler;
}
const Button = ({
  title,
  type,
  leftIcon,
  isSubmitting,
  handleClick,
  rightIcon,
  bgColor,
  textColor,
}: IIProps) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 ${
        isSubmitting ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"
      } rounded-xl text-sm font-medium text-gray-100 max-md:w-full ${
        textColor ? textColor : "text-white"
      }`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} alt="left" width={14} height={14} />}
      {title}
      {rightIcon && <Image src={rightIcon} alt="left" width={14} height={14} />}
    </button>
  );
};

export default Button;
