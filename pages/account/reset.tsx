import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import router from "next/router";
import React, { FormEvent, useState } from "react";
import FadeIn from "react-fade-in";
import Loading from "../../components/loading";
import { Firebase } from "../../libs/firebase";
const NewPassword: NextPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fire = new Firebase();
  const forgetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (currentPassword === "" || newPassword === "") {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
    }
    if (currentPassword.length < 6 || newPassword.length < 6) {
      setError("Votre mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
    }
    if (currentPassword === newPassword) {
      setError("Votre nouveau mot de passe doit être différent de l'ancien");
      setLoading(false);
    }
    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      currentPassword !== newPassword
    ) {
      try {
        await fire.updatePassword(currentPassword, newPassword);
        setSuccess(true);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const messages = fire.getErrors(error.code, error.message);
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
        title="Demo | Change Password"
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
      <FadeIn className="my-60 lg:my-64 flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <button
            className="fill-current text-black text-2xl font-bold"
            onClick={() => router.push("/")}
          >
            Back
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
            <FadeIn className="bg-green-500 border border-green-100 text-white px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
              <div className="flex justify-end space-x-2">
                <div className="inline-flex justify-center space-x-2">
                  <div className="flex">
                    <p className="text-white text-xs font-medium">
                      Mot de passe changer avec succès
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
          )}

          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <h1 className="text-center text-2xl text-gray-800 font-bold">
                Changement de mot de passe
              </h1>
              <p className="text-center text-gray-700 text-xs">
                Entrez votre nouveau mot de passe
              </p>
            </div>
            <form onSubmit={forgetPassword}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Mot de passe Actuel
                </label>
                <input
                  className="shadow appearance-none border bg-white rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="newPassword"
                >
                  Nouveau Mot de passe
                </label>
                <input
                  className="shadow appearance-none border bg-white rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="newPassword"
                  type="newPassword"
                  placeholder="Nouveau Mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="py-2 px-4 flex justify-center items-center bg-greenDDTV hover:bg-green-800 focus:ring-green-800 focus:ring-offset-green-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                >
                  {loading ? <Loading message="Chargement" /> : "Envoyer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default NewPassword;
