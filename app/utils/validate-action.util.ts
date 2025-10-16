import type { ZodError } from "zod";
import type { ZodSchema } from "zod/v3";

type ActionErrors<T> = Partial<Record<keyof T, string>>
export async function validateAction<ActionInput>(
 { request,
  schema}
: { request: Request; schema: ZodSchema } ){
  const body = Object.fromEntries(await request.formData());
  try {
    console.log(body)
    const formData = schema.parse(body) as ActionInput;
    return { formData, errors: null };
  } catch (error) {
    const err = error as ZodError;
    console.log(body, err)
    return {
      formData: body,
      errors: err.issues.reduce((acc:ActionErrors<ActionInput>, curr) => {
        const key = curr.path[0] as keyof ActionInput;
        acc[key] = curr.message;
        return acc;
      }, {}),
    };
  }
}
