//Update this array to catch more errors
const HYDRATION_ERROR_MSGS = [
  "Warning: Did not expect server HTML to contain",
  "Warning: Text content did not match. Server",
];

//Can use any npm packag instead of this
const interpolate = (template, params) =>
  params.reduce((p, c) => p.replace(/%s/, c), template);

const isReactHydrationError = (args) => {
  const errorArg = args && args[0];
  return (
    errorArg &&
    typeof errorArg.includes === "function" &&
    HYDRATION_ERROR_MSGS.some((msg) => errorArg.includes(msg))
  );
};

const logHydrationError = (args) => {
  args[0] = `ReactHydrationError - ${args[0]}`;
  const [template, ...params] = args;
  const error = interpolate(template, params);
  //Function to log this error in the desired error logging channel
  // reportError({ error });
};

const patchConsoleError = () => {
  //Save reference to original error() function
  const { error } = console;
  console.error = function () {
    if (isReactHydrationError(arguments)) {
      logHydrationError(arguments);
    }
    error.apply(console, arguments as any);
  };
};
export default patchConsoleError;
