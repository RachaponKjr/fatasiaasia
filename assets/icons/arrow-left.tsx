import React from "react";

const ArrowLeft = ({ size, color = '#333333' }: { size?: number; color?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 27 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5.2832"
        y="9.88287"
        width="6.47209"
        height="1.12108"
        rx="0.560542"
        transform="rotate(-135 5.2832 9.88287)"
        fill={color}
      />
      <rect
        x="5.97852"
        y="1.32095"
        width="6.52566"
        height="0.915035"
        rx="0.457517"
        transform="rotate(135 5.97852 1.32095)"
        fill={color}
      />
      <rect
        x="26.7871"
        y="5.6998"
        width="25.7803"
        height="0.954827"
        rx="0.477414"
        transform="rotate(-180 26.7871 5.6998)"
        fill={color}
      />
    </svg>
  );
};

export default ArrowLeft;
