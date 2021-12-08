import type { NextPage } from "next";
import React, { FormEvent, useState } from "react";
import FadeIn from "react-fade-in";
import { useRouter } from "next/router";
import Loading from "../components/loading";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { Firebase } from "../libs/firebase";
import { Validate } from "../libs/validate";
const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [redirection, setRedirection] = useState(false);
  const router = useRouter();

  const check = new Validate();
  const fire = new Firebase();
  fire.stateChanged((user) => {
    if (user) {
      setRedirection(true);
      router.push("/hello");
    }
  });
  const authenticateWithGoogle = async () => {
    try {
      setLoading(true);
      await fire.signWith("redirectAndLink");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const setEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const setPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setRedirection(false);

    if (email.length === 0 || password.length === 0) {
      setLoading(false);
      setRedirection(false);
      setError("Please enter all fields");
      return;
    }

    if (password.length < 6) {
      setLoading(false);
      setRedirection(false);
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await fire.signIn(email, password, "users", "/hello", fire.id());
      await setRedirection(true);
      await setLoading(false);
      await setSuccess(true);
    } catch (error: any) {
      setLoading(false);
      setRedirection(false);
      const messages = check.errors(error.code, error.message);
      setError(messages);
    }
    setRedirection(false);
    setLoading(false);
    setRedirection(false);
  };

  return (
    <>
      <FadeIn className="lg:my-48 my-48">
        {redirection && (
          <div className="flex items-center justify-center z-50">
            <div className="flex justify-center m-auto space-x-2">
              <svg
                className="flex justify-center animate-spin h-7 w-7 text-gray-800 mt-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="flex text-center text-lg font-medium m-auto">
                Redirection...
              </span>
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="fill-current text-black text-2xl font-bold"
            onClick={() => router.push("/")}
          >
            Logo
          </button>
        </div>
        <div className="container mx-auto px-4 py-16 max-w-xs transition-all duration-100">
          <div className="flex flex-col items-center">
            <form method="POST" onSubmit={handleSubmit}>
              {error && (
                <>
                  <FadeIn className="bg-red-500 border border-red-100 text-white px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
                    <div className="flex justify-end space-x-2">
                      <div className="inline-flex justify-center space-x-2">
                        <div className="flex">
                          <p className="text-white text-xs font-medium">
                            {error}
                          </p>
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
                </>
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
                          You are connected
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
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={setEmailChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={setPasswordChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 bg-white text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <button
                  className={
                    `py-2 px-5 flex justify-center items-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-700 focus:ring-offset-blue-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg` +
                    (loading
                      ? "py-2 px-4 flex justify-center items-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-700 focus:ring-offset-blue-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg animate-pulse cursor-not-allowed"
                      : "")
                  }
                  type="submit"
                  onClick={(e: any) => handleSubmit(e)}
                >
                  {loading ? (
                    <>
                      <Loading message="Chargement" />
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
                <button
                  className={
                    `py-2 px-4 flex justify-center items-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-700 focus:ring-offset-blue-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg` +
                    (loading
                      ? "py-2 px-4 flex justify-center items-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-700 focus:ring-offset-blue-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg animate-pulse cursor-not-allowed"
                      : "")
                  }
                  type="button"
                  onClick={() => router.push("/signup")}
                >
                  {loading ? (
                    <>
                      <Loading message="Chargement" />
                    </>
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-2 flex flex-col space-y-2">
              <button
                type="button"
                onClick={() => authenticateWithGoogle()}
                className="py-2 px-4 flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                </svg>
                Sign in with google
              </button>
              <Link href="/account/password">
                <a className="inline-block align-baseline text-center font-bold text-sm text-blue-500 hover:text-blue-700 ml-2">
                  Forgot your password?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};
export default Login;
