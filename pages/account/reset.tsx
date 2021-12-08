import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import router from "next/router";
import React, { FormEvent, useState } from "react";
import FadeIn from "react-fade-in";
import Loading from "../../components/loading";
import { configuration } from "../../utils/configuration";
import { Firebase } from "../../libs/firebase";
import { Validate } from "../../libs/validate";
const Reset: NextPage = () => {
  const [current, setCurrent] = useState("");
  const [newpass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fire = new Firebase();
  const check = new Validate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (current === "" || newpass === "") {
      setError("Please complete all fields");
      setLoading(false);
    }
    if (current.length < 6 || newpass.length < 6) {
      setError("Your password must contain at least 6 characters");
      setLoading(false);
    }
    if (current === newpass) {
      setError("Your new password must be different from the old one");
      setLoading(false);
    }
    if (current !== "" && newpass !== "" && current !== newpass) {
      try {
        await fire.updatePassword(current, newpass);
        setSuccess(true);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const messages = check.errors(error.code, error.message);
        setError(messages);
      }
    }

    if (success) {
      setLoading(false);
      return;
    }
  };
  return (
    <>
      <NextSeo
        title={configuration.title}
        description={configuration.description}
        openGraph={{
          url: configuration.openGraph.url,
          title: configuration.openGraph.title,
          description: configuration.openGraph.description,
          images: [
            {
              url: configuration.openGraph.image,
              width: configuration.openGraph.width,
              height: configuration.openGraph.height,
              alt: configuration.openGraph.alt,
            },
          ],
        }}
      />
      <FadeIn className="my-60 lg:my-64 flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <button
            className="fill-current text-black text-2xl font-bold"
            onClick={() => router.push("/")}
          >
            Logo
          </button>
        </div>
        <div className="w-full max-w-xs space-y-2">
          {error && (
            <FadeIn className="bg-red-500 border border-red-100 text-white px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
              <div className="flex justify-end space-x-2">
                <div className="inline-flex justify-center space-x-2">
                  <div className="flex">
                    <p className="text-white text-xs font-medium">{error}</p>
                  </div>
                </div>
                <div className="w-4 h-4 mt-0.5 bg-red-600 p-1 rounded-full">
                  <svg
                    className="fill-current cursor-pointer text-red-100 hover:text-red-200 transition w-2 h-2 flex justify-items-end"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => setError("")}
                  >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          )}

          {success && (
            <FadeIn className="bg-green-500 border border-blue-100 text-white px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
              <div className="flex justify-end space-x-2">
                <div className="inline-flex justify-center space-x-2">
                  <div className="flex">
                    <p className="text-white text-xs font-medium">
                      Password successfully changed
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 mt-0.5 bg-green-600 p-1 rounded-full">
                  <svg
                    className="fill-current cursor-pointer text-blue-100 hover:text-green-200 transition w-2 h-2 flex justify-items-end"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => setSuccess(false)}
                  >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          )}

          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <h1 className="text-center text-2xl text-gray-800 font-bold">
                Password change
              </h1>
              <p className="text-center text-gray-700 text-xs">
                Enter your new password
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Current Password
                </label>
                <input
                  className="shadow appearance-none border bg-white rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your current password"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="new"
                >
                  New Password
                </label>
                <input
                  className="shadow appearance-none border bg-white rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="new"
                  type="new"
                  placeholder="New password"
                  value={newpass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="py-2 px-4 flex justify-center items-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-700 focus:ring-offset-blue-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                >
                  {loading ? <Loading message="Chargement" /> : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Reset;
