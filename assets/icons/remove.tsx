import React from "react";

const RemoveIcon = ({ size = 24 }: { size: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_152_968)">
        <path
          d="M2.21875 6.4513H20.9416M7.63296 6.44249V5.93807C7.63296 4.90347 8.04396 3.91125 8.77553 3.17968C9.5071 2.4481 10.4993 2.03711 11.5339 2.03711C12.5685 2.03711 13.5608 2.4481 14.2923 3.17968C15.0239 3.91125 15.4349 4.90347 15.4349 5.93807V6.44249M9.35327 10.8479V17.4559M13.8159 10.8479V17.4559M16.5362 21.8613H6.62413C6.03994 21.8613 5.47968 21.6293 5.06659 21.2162C4.65351 20.8031 4.42144 20.2428 4.42144 19.6586V6.44249H18.7389V19.6586C18.7389 20.2428 18.5069 20.8031 18.0938 21.2162C17.6807 21.6293 17.1204 21.8613 16.5362 21.8613Z"
          stroke="#1A1A1A"
          stroke-width="1.76215"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_152_968">
          <rect
            width="22.0269"
            height="22.0269"
            fill="white"
            transform="translate(0.566406 0.936523)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RemoveIcon;
