import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <div className="flex flex-col space-y-4 p-5">
      <Skeleton height={40} width="40%" />

      <Skeleton height={300} width="40%" />
      <Skeleton height={40} width="15%" />
    </div>
  );
};

export default Loading;
