
import MenuSearch from './SideMenu/MenuSearch';
import Menu from './SideMenu/Menu';
import MenuUserProfile from './SideMenu/MenuUserProfile';
import { generatePath } from '~/constants';

export default function SideMenu() {
  return (
    <>
      <div className="flex flex-col flex-1 justify-between h-screen overflow-y-auto">
        <div className="p-4">
          {/* <!-- LOGO --> */}
          <a
            className="flex items-center text-white space-x-4"
            href={generatePath("dashboard")}
          >
            <img
              className="w-7 h-7 rounded-lg p-1"
              src={"/favicon.ico"}
              alt="Logo"
            />
          </a>

          {/* <!-- SEARCH BAR --> */}
          <MenuSearch />
          {/* <!-- SEARCH RESULT --> */}

          {/* <!-- NAV LINKS --> */}
          <Menu />
        </div>

        {/* <!-- PROFILE --> */}
        <MenuUserProfile />
      </div>
    </>
  );
}

