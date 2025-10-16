import React, { useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import Nav from "~/components/shared/Nav";
import MenuToggler from "~/components/shared/MenuToggler";
import Footer from "~/components/shared/Footer";
import { generatePath } from "~/constants";
import { createSupabaseClient } from "~/utils/supabase-client.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase, headers } = createSupabaseClient(request);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) throw redirect(generatePath("login"));

  return { user };
};
export default function Layout() {
  const [isToggle, setisToggle] = useState(false);
  const toggleMenu = () => setisToggle((prev) => !prev);
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="font-poppins antialiased bg-white dark:bg-gray-800">
      <div className="flex relative">
        <Nav isToggle={isToggle} />
        <div className="flex-1">
          <MenuToggler toggleMenu={toggleMenu} user={user} />
          <main className=" pb-20 pt-20 h-[calc(100vh-40px)] relative w-full overflow-x-hidden overflow-y-scroll ">
            <div className="">
              <Outlet />
            </div>
            {/*<!-- END OF PAGE CONTENT -->*/}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
