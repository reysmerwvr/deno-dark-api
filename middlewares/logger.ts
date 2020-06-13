import { 
  Context,
  MiddlewareFunc,
  HandlerFunc
} from "https://deno.land/x/abc@v1.0.0-rc8/mod.ts";

export const logger: MiddlewareFunc = (next: HandlerFunc) => async (c: Context) =>  {
  const start = Date.now();
  const ms = Date.now() - start;
  console.log(`${c.request.method} ${c.request.url} - ${ms}ms`);
  await next(c);
};

export default logger;