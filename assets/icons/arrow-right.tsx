import React from "react";

const ArrowRight = ({ size }: { size: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 27 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="22.1777"
        y="0.605286"
        width="6.47209"
        height="1.12108"
        rx="0.560542"
        transform="rotate(45 22.1777 0.605286)"
        fill="#333333"
      />
      <rect
        x="21.4805"
        y="9.16721"
        width="6.52566"
        height="0.915035"
        rx="0.457517"
        transform="rotate(-45 21.4805 9.16721)"
        fill="#333333"
      />
      <rect
        x="0.673828"
        y="4.7883"
        width="25.7803"
        height="0.954827"
        rx="0.477414"
        fill="#333333"
      />
    </svg>
  );
};

export default ArrowRight;
