import { Application } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import "https://deno.land/x/denv/mod.ts";
import {
  createCharacter,
  fetchAllCharacters,
  fetchOneCharacter,
  updateCharacter,
  deleteCharacter,
} from "./controllers/characters.ts";

const app = new Application();

app
  .get("/characters", fetchAllCharacters)
  .post("/characters", createCharacter)
  .get("/characters/:id", fetchOneCharacter)
  .put("/characters/:id", updateCharacter)
  .delete("/characters/:id", deleteCharacter)
  .start({ port: 8000 });