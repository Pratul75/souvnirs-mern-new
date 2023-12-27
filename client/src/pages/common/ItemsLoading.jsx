import React from "react";
import { LoadingComponent } from "../../components/LoadinComponent/LoadingComponent";

export const ItemsLoading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen min-h-screen z-50 flex justify-center items-center bg-violet-900 bg-opacity-25">
      <LoadingComponent />
    </div>
  );
};
