import type { routeConstants } from "@/app/constants";

export type RoutePath =
  (typeof routeConstants)[keyof typeof routeConstants]["path"];

// Extract valid route names from `routeConstants`
export type RouteName = keyof typeof routeConstants;

// Extract dynamic params from a path string (matches `:paramName`)
export type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<Rest>
    : T extends `${string}:${infer Param}`
      ? Param
      : never;

// Generate a map of expected params for each route
export type RouteParams = {
  [K in RouteName]: ExtractParams<
    (typeof routeConstants)[K]["path"]
  > extends never
    ? {} // No params -> empty object
    : Partial<
        Record<ExtractParams<(typeof routeConstants)[K]["path"]>, string>
      >;
};
