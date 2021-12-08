import React, { FormEvent, useState } from "react";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import FadeIn from "react-fade-in";
import { Transition } from "@headlessui/react";
import { Firebase } from "../libs/firebase";
import router from "next/router";
import { NextSeo } from "next-seo";
import { configuration } from "../utils/configuration";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const fire = new Firebase();
  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fire.signUp(email, password);
      await fire.user()?.updateProfile({
        displayName: name,
      });
      setInterval(() => {
        setError("");
      }, 3500);
    } catch (error: any) {
      setError(error.message);
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      setError("L'email doit être valide");
      return;
    }

    try {
      await fire.collection("users").add({
        name,
        email,
        password,
      });
      setSuccess(true);
      setError("");
      return;
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue");
    }
    setSuccess(true);

    if (!name || !email || !password) {
      setInterval(() => {
        setError("");
      }, 3500);
      setError("Please enter all fields");
    }
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      setInterval(() => {
        setError("");
      }, 3500);
      setError("Please enter a valid email");
    }
    if (success) {
      setSuccess(false);
    }
    if (error) {
      setError("");
    }
    if (password.length < 6) {
      setInterval(() => {
        setError("");
      }, 3500);

      setError("Password must be at least 6 characters");
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
      <FadeIn className="lg:my-60 my-60 flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <button
            className="fill-current text-black text-2xl font-bold"
            onClick={() => router.push("/")}
          >
            Logo
          </button>
        </div>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
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
            <Transition
              show={success}
              enter="transition-opacity duration-75"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-150"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <FadeIn className="bg-green-500 border border-blue-100 text-white px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
                <div className="flex justify-end space-x-2">
                  <div className="inline-flex justify-center space-x-2">
                    <div className="flex">
                      <p className="text-white text-xs font-medium">
                        Successful registration
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
            </Transition>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-white text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={(e) => onChange(e)}
              />
              {password.length < 6 && (
                <p className="text-gray-600 text-xs italic">
                  Password must contain at least 6 characters
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="py-2 px-4 flex justify-center items-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-700 focus:ring-offset-blue-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="submit"
                onClick={(e) => onSubmit(e)}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </FadeIn>
    </>
  );
};
export default SignUp;
