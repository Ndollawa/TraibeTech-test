import { useEffect, useRef } from "react";
import type { Article, Category } from "@prisma/client";
import { generatePath } from "~/constants";
import { formatDate } from "~/utils/dates.util";

interface ArticlePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  article?: (Article & { category?: Category | null }) | null;
}

export default function ArticlePreviewModal({
  isOpen,
  onClose,
  article,
}: ArticlePreviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 🔹 Close modal on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // 🔹 Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 🔹 Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen || !article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 relative animate-slideUp"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Article Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {article.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {article.category?.name
              ? `Category: ${article.category.name}`
              : "Uncategorized"}{" "}
            • {formatDate(new Date(article.createdAt).toLocaleDateString())}
          </p>
        </div>

        {/* Article Content */}
        <div className="prose dark:prose-invert max-h-[60vh] overflow-y-auto text-gray-700 dark:text-gray-300">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Close
          </button>
          <a
            href={generatePath("editArticle", {
              slug: article.slug,
            })}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
          >
            Edit Article
          </a>
        </div>
      </div>
    </div>
  );
}
