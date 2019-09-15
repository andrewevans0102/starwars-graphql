const { prisma } = require("./generated/prisma-client");

async function main() {
  // Create a new character
  const newCharacter = await prisma.createCharacter({
    name: "Luke Skywalker",
    species: "Human",
    affiliation: "REBEL_ALLIANCE",
    weapon: "lightsaber"
  });
  console.log(
    `Created new character: ${newCharacter.name} (ID: ${newCharacter.id})`
  );

  // Read all links from the database and print them to the console
  const allCharacters = await prisma.characters();
  console.log(allCharacters);
}

main().catch(e => console.error(e));
