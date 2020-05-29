import { Application } from "https://deno.land/x/abc@v1.0.0-rc8/mod.ts";
import "https://deno.land/x/denv/mod.ts";
import { 
  logger
} from "./middlewares/index.ts";

const app = new Application();
import {
  indexCharacters,
  // storeCharacters,
  // showCharacters,
  // updateCharacters,
  // destroyCharacters,
} from "./api/v1/controllers/characters.ts";

app.use(logger);
app.group("/api/v1")
  .get("/characters", indexCharacters);
  // .post("/characters", storeCharacters)
  // .get("/characters/:id", showCharacters)
  // .put("/characters/:id", updateCharacters)
  // .delete("/characters/:id", destroyCharacters)

app.start({ port: Number(Deno.env.get("PORT")) });

export default app;