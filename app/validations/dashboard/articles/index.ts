import * as z from "zod";

export const articlesSchema = z
  .object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .nonempty("Title is required")
      .min(3, { message: "Title must be at least 3 characters long." }),

    // Slug can be optional, and we’ll derive it from title if missing
    slug: z
      .string()
      .optional()
      .transform((val) =>
        val ? val.toLowerCase().trim().replace(/\s+/g, "-") : undefined
      ),

    content: z
      .string({
        required_error: "Content is required",
      })
      .min(50, {
        message: "Article content must be at least 50 characters long.",
      }),

    categoryId: z
      .string({
        required_error: "Category is required",
      })
      .nonempty("Category is required"),
  })
  .transform((data) => ({
    ...data,
    slug:
      data.slug ||
      data.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // remove special chars
        .replace(/\s+/g, "-") // replace spaces with dashes
        .replace(/--+/g, "-") // collapse multiple dashes
        .replace(/^-+|-+$/g, ""), // trim dashes from ends
  }));


export type ArticlesSchema = z.infer<typeof articlesSchema>;
