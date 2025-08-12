import Link from "next/link";
import React, { ReactNode } from "react";

const LayoutSection = ({
  children,
  link,
  title,
}: {
  children: ReactNode;
  link?: string;
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex justify-between items-center">
        <h5 className="text-[#333333] font-bold text-4xl">{title}</h5>
        {link && (
          <Link
            href={link}
            className="text-xs font-semibold text-white bg-[#BD3E2B] hover:bg-[#BD3E2B]/80 cursor-pointer px-10 py-5 rounded-[40px]"
          >
            Explore more
          </Link>
        )}
      </div>
      {children}
    </div>
  );
};

export default LayoutSection;
