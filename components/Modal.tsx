"use client";

import { useCallback, useRef, ReactNode, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-4 right-8"
      >
        <Image
          src="/close.svg"
          alt="close-button"
          width={17}
          height={17}
          className="w-auto h-auto"
        />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
      ;
    </div>
  );
};

export default Modal;
