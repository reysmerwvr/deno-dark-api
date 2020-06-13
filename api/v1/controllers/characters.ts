import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc8/mod.ts";
import db from "../../../config/db.ts";
import { getSuccessObject, getErrorObject} from "../../../helpers/index.ts"

// DB collection made
const database = db.getDatabase;
const charactersCollection = database.collection("characters");

// Character type defined
interface Character {
  _id: {
    $oid: string;
  };
  name: string;
  predecessors?: Array<Character>;
  ancestors?: Array<Character>;
  age_of_birth?: number;
  kinship?: string;
}

export const indexCharacters: HandlerFunc = async (c: Context) => {
  try {
    const characters: Character[] = await charactersCollection.find();
    if (characters) {
      const charactersList = (characters.length > 0)
        ? characters.map((character) => {
          const { _id: { $oid }, name, predecessors, ancestors, age_of_birth } = character;
          return { id: $oid, name, predecessors, ancestors, age_of_birth };
        })
        : [];
        return await c.json(getSuccessObject(charactersList), 200);
    }
  } catch (error) {
    return await c.json(getErrorObject(error, error.message), 500);
  }
};

export const storeCharacters: HandlerFunc = async (c: Context) => {
  try {
    const body = await (c.body()) as {
      name: string;
      predecessors?: Array<Character>;
      ancestors?: Array<Character>;
      age_of_birth?: number;
      kinship?: string;
      other_names?: Array<string>;
    };
    if (Object.keys(body).length <= 0) {
      return await c.json(getErrorObject({}, "Request can't be empty"), 400);
    }
    const { name, predecessors, ancestors, age_of_birth, kinship, other_names } = body;
    const { $oid } = await charactersCollection.insertOne({
      name,
      predecessors,
      ancestors,
      age_of_birth,
      kinship,
      other_names
    });
    const character = await charactersCollection.findOne({ _id: { $oid } });
    if (character) {
      return await c.json(getSuccessObject(character), 200);
    }
  } catch (error) {
    return await c.json(getErrorObject(error, error.message), 500);
  }
};

export const showCharacters: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };
    const character = await charactersCollection.findOne({ _id: { "$oid": id } });
    if (character) {
      return await c.json(getSuccessObject(character), 200);
    }
    return await c.json(getErrorObject({}, "Character not found"), 404);
  } catch (error) {
    return await c.json(getErrorObject(error, error.message), 500);
  }
};

export const updateCharacters: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };
    const body = await (c.body()) as {
      name?: string;
      predecessors?: Array<Character>;
      ancestors?: Array<Character>;
      age_of_birth?: number;
      kinship?: string;
      other_names?: Array<string>;
    };
    if (Object.keys(body).length <= 0) {
      return await c.json(getErrorObject({}, "Request can't be empty"), 400);
    }
    let character = await charactersCollection.findOne({ _id: { "$oid": id } });
    if (character) {
      const { matchedCount, upsertedId } = await charactersCollection.updateOne(
        { _id: { "$oid": id } },
        { $set: body },
      );
      if (matchedCount) {
        character = await charactersCollection.findOne({ _id:{ "$oid": id } });
        if (character) {
          return await c.json(getSuccessObject(character, "Character updated successfully!"), 200);
        }
      }
      return await c.json(getErrorObject({}, "Unable to update character"), 400);
    }
    return await c.json(getErrorObject({}, "Character not found"), 404);
  } catch (error) {
    return await c.json(getErrorObject(error, error.message), 500);
  }
};

export const destroyCharacters: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };
    const character = await charactersCollection.findOne({ _id: { "$oid": id } });
    if (character) {
      const deleteCount = await charactersCollection.deleteOne({ _id: { "$oid": id } });
      if (deleteCount) {
        return await c.json(getSuccessObject({}, "Character deleted successfully!"), 204);
      }
      return await c.json(getErrorObject({}, "Unable to delete character"), 400);
    }
    return await c.json(getErrorObject({}, "Character not found"), 404);
  } catch (error) {
    return await c.json(getErrorObject(error, error.message), 500);
  }
};