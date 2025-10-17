import type { RouteName, RouteParams } from "~/types/";

export const routeConstants = {
  "#": {
    path: "#",
    name: "none",
  },

  onboarding: {
    path: "/auth",
    name: "Onboading",
  },
  login: {
    path: "/auth/login",
    name: "Login",
  },
  logout: {
    path: "/logout",
    name: "Logout",
  },
  register: {
    path: "/auth/register",
    name: "Register",
  },
  emailVerification: {
    path: "/auth/email-verify",
    name: "Email verification",
  },
  emailVerificationStatus: {
    path: "/auth/email-verify/:token",
    name: "Email verification status",
  },
  forgotPassword: {
    path: "/auth/forgot-password",
    name: "Forgot Password",
  },
  resetPassword: {
    path: "/auth/forgot-password/:resetToken/reset",
    name: "Reset Password",
  },

  // Others
  home: {
    path: "/",
    name: "Home",
  },
  error: {
    path: "/error/:errorCode",
    name: "Error",
  },

  // Dashboard
  dashboard: {
    // Same as articles as properties is index
    path: "/dashboard",
    name: "Dashboard",
  },

  // Articles
  articles: {
    path: "/dashboard/articles",
    name: "Articles",
  },
  createArticle: {
    path: "/dashboard/articles/create",
    name: "Create New Article",
  },
  editArticle: {
    path: "/dashboard/articles/:slug/edit",
    name: "Edit Article",
  },
  // Seeding
  seed: {
    path: "/dashboard/admin/seed",
    name: "Seed Database",
  },
} as const;

export function generatePath(
  routeName: RouteName,
  params: Record<string, any> = {},
  query: Record<string, any> = {}
): string {
  const route = routeConstants[routeName];
  if (!route || !route.path) {
    console.warn(`[generatePath] Invalid route name: "${routeName}"`);
    return "#"; // fallback to safe default
  }

  // Preserve the route's absolute path (no leading slash removal)
  const basePath = route.path.startsWith("/") ? route.path : `/${route.path}`;
  // Replace path parameters (like :id) safely
  const resolvedPath = basePath
    .split("/")
    .map((segment) => {
      if (segment.startsWith(":")) {
        const key = segment.slice(1);
        const value = params[key];
        // Skip missing params to avoid "/undefined"
        return value !== undefined && value !== null
          ? encodeURIComponent(String(value))
          : null;
      }
      return segment;
    })
    .filter(Boolean)
    .join("/");

  // Build query string
  const queryString = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((v) => queryString.append(key, String(v)));
    } else {
      queryString.set(key, String(value));
    }
  });
  const qs = queryString.toString();
  return qs ? `/${resolvedPath}?${qs}` : `/${resolvedPath}`;
}
