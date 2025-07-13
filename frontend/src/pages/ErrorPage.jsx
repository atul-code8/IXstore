import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className="h-screen flex flex-col justify-center items-center"
    >
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p className="mt-2">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500 font-semibold mt-2">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="mt-10">
        <button
          type="button"
          className="flex gap-x-2 items-center px-4 py-2 bg-slate-50 font-semibold shadow-sm text-center rounded hover:bg-[#ebebf0] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          <span>Back</span>
        </button>
      </Link>
    </div>
  );
}
