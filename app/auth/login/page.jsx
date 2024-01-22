// ... (previous imports)

const Login = () => {
  return (
    <>
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm ">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Don't have an account yet?
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium "
                  href="../examples/html/signup.html"
                >
                  Sign up here
                </a>
              </p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-black oultine-none bg-white text-gray-800 shadow-sm  "
              >
                <svg
                  className="w-4 h-auto"
                  width={46}
                  height={47}
                  viewBox="0 0 46 47"
                  fill="none"
                >
                  {/* ... (previous SVG code) */}
                </svg>
                Sign in with Google
              </button>
              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                Or
              </div>
              {/* Form */}
              <form>
                {/* ... (previous form elements) */}
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
