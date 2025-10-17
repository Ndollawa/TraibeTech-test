import {
  useLoaderData,
  Link,
  type LoaderFunctionArgs,
  Outlet,
} from "react-router";
import ArticleTree from "~/components/dashboard/articles/ArticleTree";
import { prisma } from "~/utils/prisma-client.server";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const categories = await prisma.category.findMany({
    where: { deletedAt: null, parentId: null },
    include: {
      children: {
        include: {
          children: true,
          articles: true,
        },
      },
      articles: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return { categories };
};

export default function IndexPage() {
  const { categories } = useLoaderData<typeof loader>();
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      <div className="md:col-span-4 bg-gray-100 dark:bg-gray-900 p-2 sm:p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          CMS Article Tree
        </h1>
        <div className="rounded-lg bg-white dark:bg-gray-950 shadow p-4">
          <ArticleTree categories={categories} />
        </div>
      </div>
      <div className="md:col-span-8 bg-gray-100 dark:bg-gray-900 p-6">
        <Outlet />
      </div>
    </div>
  );
}
