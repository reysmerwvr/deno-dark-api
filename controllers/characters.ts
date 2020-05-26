import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc8/mod.ts";
import db from "../config/db.ts";

// DB collection made
const database = db.getDatabase;
const characters = database.collection("characters");

// Character type defined
interface Character {
  _id: {
    $oid: string;
  };
  name: string;
  age: string;
}

export const createCharacter: HandlerFunc = async (c: Context) => {
  try {
    const body = await (c.body());
    if (!Object.keys(body).length) {
      return c.string("Request can't be empty", 400);
    }
    const { name, breed, age } = body;

    const insertedCharacter = await characters.insertOne({
      name,
      breed,
      age,
    });

    return c.json(insertedCharacter, 201);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const fetchAllCharacters: HandlerFunc = async (c: Context) => {
  try {
    const fetchedCharacters: Character[] = await characters.find();

    if (fetchedCharacters) {
      const fetchedCharactersList = fetchedCharacters.length
        ? fetchedCharacters.map((dog) => {
          const { _id: { $oid }, name, breed, age } = dog;
          return { id: $oid, name, breed, age };
        })
        : [];
      return c.json(fetchedCharactersList, 200);
    }
  } catch (error) {
    return c.json(error, 500);
  }
};

export const fetchOneCharacter: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };

    const fetchedCharacter = await characters.findOne({ _id: { "$oid": id } });

    if (fetchedCharacter) {
      const { _id: { $oid }, name, breed, age } = fetchedCharacter;
      return c.json({ id: $oid, name, breed, age }, 200);
    }
    return c.string("Character not found", 404);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const updateCharacter: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };

    const body = await (c.body()) as {
      name?: string;
      breed?: string;
      age?: string;
    };

    if (!Object.keys(body).length) {
      return c.string("Request can't be empty", 400);
    }

    const fetchedCharacter = await characters.findOne({ _id: { "$oid": id } });

    if (fetchedCharacter) {
      const { matchedCount } = await characters.updateOne(
        { _id: { "$oid": id } },
        { $set: body },
      );
      if (matchedCount) {
        return c.string("Character updated successfully!", 204);
      }
      return c.string("Unable to update dog");
    }

    return c.string("Character not found", 404);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const deleteCharacter: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };

    const fetchedCharacter = await characters.findOne({ _id: { "$oid": id } });

    if (fetchedCharacter) {
      const deleteCount = await characters.deleteOne({ _id: { "$oid": id } });

      if (deleteCount) {
        return c.string("Character deleted successfully!", 204);
      }
      return c.string("Unable to delete dog");
    }

    return c.string("Character not found", 404);
  } catch (error) {
    return c.json(error, 500);
  }
};