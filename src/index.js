const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const typeDefs = `
type Query {
  characters: [Character!]!
}

type Character {
  name: String!,
  species: String!,
  affiliation: affiliation!
  weapon: String!
}

enum affiliation {
  REBEL_ALLIANCE,
  EMPIRE
}

type Mutation {
  post(name: String!, species: String!, affiliation: affiliation!, weapon: String!): Character!
}
`;

// // local storage of characters, this will be moved later
// const characters = [
//   {
//     name: "Han Solo",
//     species: "Human",
//     affiliation: "REBEL_ALLIANCE",
//     weapon: "blaster rifle"
//   },
//   {
//     name: "Chewbacca",
//     species: "Wookie",
//     affiliation: "REBEL_ALLIANCE",
//     weapon: "bowcaster"
//   }
// ];

// resolving queries
const resolvers = {
  Query: {
    characters: (root, args, context, info) => {
      return context.prisma.characters();
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createCharacter({
        name: args.name,
        species: args.species,
        affiliation: args.affiliation,
        weapon: args.weapon
      });
    }
  }
};

// Server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { prisma }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
