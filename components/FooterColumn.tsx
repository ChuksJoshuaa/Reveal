import { FooterInterface } from "@/utils/interfaces";
import Link from "next/link";

const FooterColumn = ({ title, links }: FooterInterface) => {
  return (
    <div className="footer_column">
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2 font-normal">
        {links.map((item) => (
          <Link href="/" key={item}>
            {item}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
