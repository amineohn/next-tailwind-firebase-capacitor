import React, { useState } from "react";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import FadeIn from "react-fade-in";
import { Transition } from "@headlessui/react";
import { Firebase } from "../libs/firebase";
import router from "next/router";
import { NextSeo } from "next-seo";

const signup = () => {
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
  // progress bar animation
  const [progress, setProgress] = useState(0);
  const [progressBar, setProgressBar] = useState(false);

  // progress bar animation end

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await fire.signUp(email, password);
      await fire.getAuth().currentUser?.updateProfile({
        displayName: name,
      });
      setInterval(() => {
        setError("");
      }, 3500);
      setError("Inscription réussie");
    } catch (error: any) {
      setError(error.message);
    }
    if (password.length < 6) {
      setError("Le mot de passe doit être au moins de 6 caractères");
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
    setProgressBar(true);
    setTimeout(() => {
      setProgress(100);
      setProgressBar(false);
      setSuccess(true);
    }, 2000);

    try {
      await fire.getCollection("users").add({
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
      setError("Veuillez saisir tous les champs");
    }
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      setInterval(() => {
        setError("");
      }, 3500);
      setError("Veuillez entrer un email valide");
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
      setProgressBar(true);

      setError("Le mot de passe doit être au moins de 6 caractères");
      return;
    }
  };
  // progress bar if password is less than 6
  return (
    <>
      <NextSeo
        title="Demo | SignUp"
        description=""
        openGraph={{
          url: "http://URL.com",
          title: "Demo",
          description: "",
          images: [
            {
              url: "/static/images/logos.jpg",
              width: 800,
              height: 600,
              alt: "Hello",
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
            Back
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
              <FadeIn className="bg-green-500 border border-green-100 text-white px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
                <div className="flex justify-end space-x-2">
                  <div className="inline-flex justify-center space-x-2">
                    <div className="flex">
                      <p className="text-white text-xs font-medium">
                        Inscription réussie
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 mt-0.5 bg-green-600 p-1 rounded-full">
                    <svg
                      className="fill-current cursor-pointer text-green-100 hover:text-green-200 transition w-2 h-2 flex justify-items-end"
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
                Nom
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Nom"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Mail
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Mail"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-white text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => onChange(e)}
              />
              {password.length < 6 && (
                <p className="text-gray-600 text-xs italic">
                  Le mot de passe doit contenir au moins 6 caractères
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="py-2 px-4 flex justify-center items-center bg-greenDDTV hover:bg-green-800 focus:ring-green-800 focus:ring-offset-green-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="submit"
                onClick={(e) => onSubmit(e)}
              >
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </FadeIn>
    </>
  );
};
export default signup;
