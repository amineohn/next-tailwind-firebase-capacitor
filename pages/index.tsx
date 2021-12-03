import router from "next/router";
import type { NextPage } from "next";
import React from "react";
import FadeIn from "react-fade-in";
const Home: NextPage = () => {
  return (
    <>
      <FadeIn>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="rounded-lg px-8 pt-6 pb-8 mb-4 space-y-2">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-center text-2xl font-bold text-gray-800">
                Welcome
              </h1>
              <p className="text-center text-gray-600">
                is a simple, yet powerful, template for create your next web
                project and mobile project (PWA).
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                className="max-w-xs py-2 px-4 flex justify-center items-center bg-greenDDTV hover:bg-green-800 focus:ring-green-800 focus:ring-offset-green-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                onClick={() => router.push("/login")}
              >
                Try out
              </button>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};
export default Home;
