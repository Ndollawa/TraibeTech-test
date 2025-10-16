import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("logout", "./routes/logout.tsx"),
  layout("./routes/auth/layout.tsx", [
    route("auth/login", "./routes/auth/login.tsx"),
    route("auth/register", "./routes/auth/register.tsx"),
  ]),
  // parent route
  layout("./routes/dashboard/layout.tsx", [
    route("dashboard", "./routes/dashboard/index.tsx", [
      route("articles", "./routes/dashboard/articles/index.tsx"),
      layout("./routes/dashboard/articles/layout.tsx", [
        route("articles/create", "./routes/dashboard/articles/create.tsx"),
        route(
          "articles/:slug/edit",
          "./routes/dashboard/articles/$slug.edit.tsx"
        ),
      ]),

      route("admin/seed", "./routes/dashboard/admin/seed.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
