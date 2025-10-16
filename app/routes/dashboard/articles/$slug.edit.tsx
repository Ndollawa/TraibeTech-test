import {
  Form,
  redirect,
  useLoaderData,
  useNavigation,
  useActionData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import RecursiveCategorySelector from "~/components/dashboard/articles/RecursiveCatogorySelector";
import { validateAction } from "~/utils";
import {
  articlesSchema,
  type ArticlesSchema,
} from "~/validations/dashboard/articles";
import { useDeviceTheme } from "~/hooks";
import { prisma } from "~/utils/prisma-client.server";

const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  customClass: { popup: "colored-toast" },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

/* -----------------------  Loader ------------------------ */
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;
  if (!slug) throw new Response("Slug not provided", { status: 400 });

  const article = await prisma.article.findUnique({
    where: { slug },
  });
  if (!article) throw new Response("Article not found", { status: 404 });

  const categories = await prisma.category.findMany({
    where: { deletedAt: null },
    include: {
      children: { include: { children: true, articles: true } },
      articles: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return { article, categories };
};

/* -----------------------  Action ------------------------ */
export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { slug } = params;
  if (!slug) throw new Response("Slug not provided", { status: 400 });

  const { formData, errors } = await validateAction<ArticlesSchema>({
    request,
    schema: articlesSchema,
  });
  if (errors) return { errors };

  const { title, content, categoryId } = formData;

  await prisma.article.update({
    where: { slug },
    data: { title, content, categoryId },
  });

  return { success: true };
};

/* -----------------------  Component --------------------- */
export default function EditArticle() {
  const { article, categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const theme = useDeviceTheme();

  const editorRef = useRef<any>(null);
  const [content, setContent] = useState(article.content ?? "");

  /* ---- Toast on success ---- */
  useEffect(() => {
    if (actionData?.success) {
      Toast.fire({
        icon: "success",
        title: "Updated!",
        text: "Article updated successfully!",
      });
    }
  }, [actionData]);

  /* -----------------------  UI  -------------------------- */
  return (
    <div>
      <h1 className="text-2xl mb-4 font-semibold">Edit Article</h1>

      <Form method="post" className="flex flex-col gap-4">
        {/* Title */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={article.title}
            placeholder="Title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-green-500 focus:border-green-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                       dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          {actionData?.errors?.title && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">*</span> {actionData.errors.title}
            </p>
          )}
        </div>

        {/* Category Selector */}
        <div className="mb-4">
          <RecursiveCategorySelector
            categories={categories}
            name="categoryId"
            initialValue={article.categoryId}
            isRequired={false}
          />
          {actionData?.errors?.categoryId && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">*</span>{" "}
              {actionData.errors.categoryId}
            </p>
          )}
        </div>

        {/* TinyMCE Editor */}
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Content *
          </label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            onInit={(_, editor) => (editorRef.current = editor)}
            initialValue={article.content}
            onEditorChange={(newValue) => setContent(newValue)}
            textareaName="content"
            init={{
              height: 320,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              skin: theme === "dark" ? "oxide-dark" : "oxide",
              content_css: theme,
            }}
          />
          {actionData?.errors?.content && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">*</span> {actionData.errors.content}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded 
                     hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? "Saving..." : "Update"}
        </button>
      </Form>
    </div>
  );
}
