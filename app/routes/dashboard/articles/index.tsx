import { useEffect, useState } from "react";
import {
  Link,
  useFetcher,
  useLoaderData,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "react-router";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { generatePath } from "~/constants";
import ArticlePreviewModal from "~/components/dashboard/articles/ArticlePreviewModal";
import { formatDate } from "~/utils/dates.util";
import { prisma } from "~/utils/prisma-client.server";
import Swal from "sweetalert2";

/* ------------------- Loader -------------------- */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const articles = await prisma.article.findMany({
    where: { deletedAt: null },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return { articles };
};

/* ------------------- Action -------------------- */
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  if (!id) throw new Response("Missing ID", { status: 400 });

  await prisma.article.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return { success: true };
};

/* ------------------- Component -------------------- */
export default function ArticleList() {
  const { articles } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(articles);
  const [selected, setSelected] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPreview = (article: any) => {
    setSelected(article);
    setIsOpen(true);
  };

  // SweetAlert Toast Config
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    customClass: { popup: "colored-toast" },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  /* ---- Filter articles ---- */
  useEffect(() => {
    const lower = query.toLowerCase();
    setFiltered(
      articles.filter(
        (a) =>
          a.title.toLowerCase().includes(lower) ||
          a.slug.toLowerCase().includes(lower) ||
          a.category?.name?.toLowerCase()?.includes(lower)
      )
    );
  }, [query, articles]);

  /* ---- Delete article ---- */
  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: `Delete "${title}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const formData = new FormData();
      formData.append("id", id);
      fetcher.submit(formData, { method: "post" });

      Toast.fire({
        icon: "success",
        title: "Article deleted successfully!",
      });
    }
  };

  /* ---- UI ---- */
  return (
    <div className="grid grid-cols-1 w-full box-border overflow-x-auto shadow-md sm:rounded-lg">
      {/* Search */}
      <div className="py-4 bg-gray-700 dark:bg-gray-900 w-full box-border flex flex-1 justify-between items-center px-4">
        <div className="relative mt-2 w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block box-border pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-200
                       focus:ring-blue-500 focus:border-blue-500
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search article..."
          />
        </div>
        <Link
          to={generatePath("createArticle")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm text-nowrap"
        >
          + New Article
        </Link>
      </div>
      {/* Table */}
      <div className=" box-border relative">
        <table className="w-full box-border relative text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Slug</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((article) => (
                <tr
                  key={article.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {article.title}
                  </td>
                  <td className="px-6 py-4">{article.slug}</td>
                  <td className="px-6 py-4">{article.category?.name || "—"}</td>
                  <td className="px-6 py-4">
                    {formatDate(
                      new Date(article.createdAt).toLocaleDateString()
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex gap-2 justify-end">
                    {/* <Link
                    to={`/dashboard/articles/${article.slug}`}
                    className="text-gray-500 hover:text-green-600"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </Link> */}
                    <button
                      onClick={() => openPreview(article)}
                      className="text-gray-500 hover:text-green-600"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <Link
                      to={generatePath("editArticle", {
                        slug: article.slug,
                      })}
                      className="text-blue-600 hover:text-blue-700"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id, article.title)}
                      className="text-red-600 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ArticlePreviewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        article={selected}
      />
    </div>
  );
}
