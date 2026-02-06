import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundImage from "../../assets/images/notfound.png";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="bg-white shadow-lg rounded-xl px-10 pb-8 flex flex-col items-center max-w-lg w-full">
        
        <img
          src={notFoundImage}
          alt="Not Found"
          className="w-80 "
        />

        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          We’re Sorry, an error has occurred
        </h2>

        <p className="text-gray-600 text-center mt-3">
          We seem to have lost this page, but we don’t want to lose you.
        </p>

        <button
          onClick={() => {
            window.location.reload();
          }}
          className="mt-6 bg-accent text-white px-12 py-2 rounded-md hover:opacity-90 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
