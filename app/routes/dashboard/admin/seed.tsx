
import { Form, useActionData, type ActionFunctionArgs } from "react-router";
import { runSeed } from "~/api";


// Optional: simple protection
const SEED_SECRET = process.env.SEED_SECRET || "dev-seed";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const token = formData.get("token");

  if (token !== SEED_SECRET) {
    return ({ success: false, message: "Unauthorized" });
  }

  try {
    await runSeed();
    return ({ success: true, message: "Database seeded successfully!" });
  } catch (err: any) {
    console.error("❌ Seed failed:", err);
    return ({ success: false, message: "Error: " + err.message });
  }
}

export default function AdminSeedPage() {
  const result = useActionData<typeof action>();

  return (
    <div className="flex flex-col items-center justify-center h-full flex-1 p-8">
      <div className="bg-gray-200 dark:bg-gray-900 rounded-lg shadow p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Seed Database
        </h1>
        <p className="text-gray-500 mb-6">
          This will reset and repopulate the database with test categories and
          articles.
        </p>

        <Form method="post" className="space-y-4">
          <input
            type="password"
            name="token"
            placeholder="Enter SEED_SECRET"
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Run Seed
          </button>
        </Form>

        {result && (
          <div
            className={`mt-4 p-3 rounded ${
              result.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {result.message}
          </div>
        )}
      </div>
    </div>
  );
}
