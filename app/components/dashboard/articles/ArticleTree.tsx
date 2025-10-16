import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Folder, FileText } from "lucide-react";
import type { Category, Article } from "@prisma/client";
import { generatePath } from "~/constants";

type CategoryWithChildren = Category & {
  children: CategoryWithChildren[];
  articles: Article[];
};

export default function ArticleTree({
  categories,
}: {
  categories: CategoryWithChildren[];
}) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
      <TreeLevel
        categories={categories}
        depth={0}
        openIds={openIds}
        onToggle={toggle}
      />
    </div>
  );
}

/**
 * One level of the tree. Keeps track of which category at this level is open.
 */
function TreeLevel({
  categories,
  depth,
  openIds,
  onToggle,
}: {
  categories: CategoryWithChildren[];
  depth: number;
  openIds: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <ul className="select-none">
      {categories.map((category) => (
        <TreeNode
          key={category.id}
          category={category}
          depth={depth}
          isOpen={openIds[category.id]}
          onToggle={onToggle}
          openIds={openIds}
        />
      ))}
    </ul>
  );
}


/**
 * Individual category node (and its nested contents)
 */
function TreeNode({
  category,
  depth,
  isOpen,
  onToggle,
  openIds,
}: {
  category: CategoryWithChildren;
  depth: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
  openIds: Record<string, boolean>;
}) {
  const hasChildren =
    (category.children && category.children.length > 0) ||
    (category.articles && category.articles.length > 0);

  return (
    <li>
      <div
        style={{ paddingLeft: `${depth * 12}px` }}
        className="flex items-center gap-1 py-[4px] cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 rounded-sm transition-colors"
        onClick={() => hasChildren && onToggle(category.id)}
      >
        {hasChildren ? (
          isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 shrink-0" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
          )
        ) : (
          <span className="w-3.5 h-3.5" />
        )}

        <Folder className="w-4 h-4 text-yellow-600 dark:text-yellow-500 shrink-0" />
        <span>{category.name}</span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            key="children"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {category.articles?.map((article) => (
              <li key={article.id}>
                <div
                  style={{ paddingLeft: `${(depth + 1) * 12}px` }}
                  className="flex items-center gap-1 py-[4px] hover:bg-gray-300 dark:hover:bg-gray-800 rounded-sm transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 shrink-0" />
                  <Link
                    to={generatePath(
                      "editArticle",{
                        slug:article.slug
                      }
                    )}
                    className="truncate hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {article.title}
                  </Link>
                </div>
              </li>
            ))}

            {category.children?.length > 0 && (
              <TreeLevel
                categories={category.children}
                depth={depth + 1}
                openIds={openIds}
                onToggle={onToggle}
              />
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

