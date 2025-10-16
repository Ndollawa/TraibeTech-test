import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  parentId?: string | null;
}

interface RecursiveCategorySelectorProps {
  categories: Category[];
  name: string;
  isRequired?: boolean;
  initialValue?: string | null; // For edit mode
}

/**
 * Recursive Category Selector:
 * - Allows selecting parent or child category
 * - Deepest valid selection becomes final submitted value
 * - Fully safe (no recursion overflow)
 */
export default function RecursiveCategorySelector({
  categories,
  name,
  isRequired = true,
  initialValue = null,
}: RecursiveCategorySelectorProps) {
  const [finalId, setFinalId] = useState<string>(initialValue ?? "");

  return (
    <div className="mb-4">
      <RecursiveLevel
        categories={categories}
        parentId={null}
        isRequired={isRequired}
        initialValue={initialValue}
        onChangeFinal={setFinalId}
      />
      {finalId && <input type="hidden" name={name} value={finalId} />}
    </div>
  );
}

/* ---------------------------- Recursive Level ---------------------------- */
function RecursiveLevel({
  categories,
  parentId,
  isRequired,
  initialValue,
  onChangeFinal,
}: {
  categories: Category[];
  parentId: string | null;
  isRequired: boolean;
  initialValue?: string | null;
  onChangeFinal: (value: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string>("");
  const available = categories.filter((c) => c.parentId === parentId);
  const children = categories.filter((c) => c.parentId === selectedId);

  // Prefill chain on mount
  useEffect(() => {
    if (!initialValue) return;
    const current = categories.find((c) => c.id === initialValue);
    if (!current) return;

    // If this level owns that ID, select it
    if (current.parentId === parentId) {
      setSelectedId(current.id);
    } else if (current.parentId) {
      // Climb upward and preselect parent levels
      const parent = categories.find((c) => c.id === current.parentId);
      if (parent && parent.parentId === parentId) {
        setSelectedId(parent.id);
      }
    }
  }, [initialValue, categories, parentId]);

  // Update final value when user selects
  useEffect(() => {
    if (selectedId) onChangeFinal(selectedId);
  }, [selectedId]);

  if (available.length === 0) return null;

  return (
    <div>
      <label
        htmlFor={`category-${parentId ?? "root"}`}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {parentId ? "Subcategory" : "Category"}
      </label>

      <select
        id={`category-${parentId ?? "root"}`}
        value={selectedId}
        required={isRequired && !parentId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="form-select w-full p-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:text-gray-100"
      >
        <option value="">
          Select a {parentId ? "subcategory" : "category"}
        </option>
        {available.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {selectedId && children.length > 0 && (
        <div className="ml-4 mt-3 border-l border-gray-300 dark:border-gray-700 pl-4">
          <RecursiveLevel
            categories={categories}
            parentId={selectedId}
            isRequired={isRequired}
            initialValue={initialValue}
            onChangeFinal={onChangeFinal}
          />
        </div>
      )}
    </div>
  );
}
