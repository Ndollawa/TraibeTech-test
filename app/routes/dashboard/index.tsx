import {
  Link,
  Outlet,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import { generatePath } from "~/constants";
import { prisma } from "~/utils/prisma-client.server";

export const loader = async () => {
  const categories = await prisma.category.findMany({
    where: { deletedAt: null },
    include: {
      children: {
        include: {
          articles: true,
        },
      },
      articles: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return { categories };
};
// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const articles = await prisma.article.findMany({
//     include: {
//       category: {
//         include: {
//           parent: true,
//         },
//       },
//     },
//     orderBy: { createdAt: "desc" },
//   });

//   return ({ articles });
// };

export default function Index() {
  const { categories } = useLoaderData<typeof loader>();
  return (
    <div className="p-8">
      <div className="block space-x-4 space-y-4 md:flex md:justify-between mb-4">
        <h1 className="text-2xl font-semibold">Articles</h1>
        <div className="space-x-4">
          <Link
            to={generatePath("seed")}
            className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white  py-2.5 px-4 rounded"
          >
            Seed Database
          </Link>
          
        </div>
      </div>
      <Outlet />
    </div>
  );
}
