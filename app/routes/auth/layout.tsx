import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <div className="font-poppins bg-[#08151b] absolute top-0 left-0 bg-gradient-to-b from-[#08151b] via-green-950 to-green-700 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div className="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl gap-20">
        <div className="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
          <div className="self-start hidden lg:flex flex-col  text-gray-100">
            <h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
            <p className="pr-3 text-sm opacity-75">
              to TraibeTech CMS App! Discover cutting-edge startups,
              connect with industry experts, stay informed with the latest
              trends, personalize your feed, collaborate with like-minded
              individuals, and innovate with confidence.
            </p>
          </div>
        </div>

        <Outlet />
      </div>
      <footer className="bg-transparent absolute w-full bottom-0 left-0 z-30">
        <div className="container p-5 mx-auto  flex items-center justify-between ">
          <div className="flex mr-auto">
            <a
              href="https://github.com/Ndollawa"
              target="_blank"
              title="Ollawa Ndubuisi github"
              className="text-center text-gray-700 focus:outline-none"
            >
              <img
                src="https://avatars.githubusercontent.com/u/60238828?v=4"
                alt="Ollawa Ndubuisi"
                className="object-cover mx-auto  rounded-full w-10 h-10"
              />
              <p className="text-xl text-gray-800 dark:text-gray-100">
                Ollawa <strong>Ndubuisi</strong>
              </p>{" "}
            </a>
          </div>
        </div>
      </footer>

      <svg
        className="absolute bottom-0 left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"      >
        <path
        className="fill-white dark:fill-gray-950 "
          fill="currentColor"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}
