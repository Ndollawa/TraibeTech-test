
import MenuSearch from './SideMenu/MenuSearch';
import Menu from './SideMenu/Menu';
// import MenuUserProfile from './SideMenu/MenuUserProfile';
import { generatePath } from '~/constants';

export default function SideMenu() {
  return (
    <>
      <div className="flex flex-col flex-1 justify-between h-screen overflow-y-auto">
        <div className="p-4 w-full">
          {/* <!-- LOGO --> */}
          <a
            className="flex items-center text-white space-x-4 w-full"
            href={generatePath("dashboard")}
          >
            <div className="flex h-16 mx-auto relative">
              <img
                src="/assets/images/logo.png"
                alt="logo"
                className="rounded-xs w-full relative object-cover m-4 my-2"
              />
            </div>
          </a>

          {/* <!-- SEARCH BAR --> */}
          <MenuSearch />
          {/* <!-- SEARCH RESULT --> */}

          {/* <!-- NAV LINKS --> */}
          <Menu />
        </div>

        {/* <!-- PROFILE --> */}
        {/* <MenuUserProfile /> */}
      </div>
    </>
  );
}

