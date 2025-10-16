import { type ActionFunction } from "react-router";
import { createSupabaseClient } from "~/utils/supabase-client.server";
import { redirect } from "react-router";
import { generatePath } from "~/constants";

export const action: ActionFunction = async ({ request }) => {
  const client = createSupabaseClient(request);
  await client.supabase.auth.signOut();

  const response = redirect(generatePath("login"));
  response.headers.append("Set-Cookie", "sb:token=; Max-Age=0; Path=/;");
  return response;
};

export default function Logout() {
  return null;
}
