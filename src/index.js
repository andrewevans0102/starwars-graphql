// const { GraphQLServer } = require("graphql-yoga");
//
// // // Type Definition
// // const typeDefs = `
// // type Query {
// //   character: String!
// // }
// // `;
// //
// // // Resolvers
// // const resolvers = {
// //   Query: {
// //     character: () => `The force is strong with this API!`
// //   }
// // };
// //
// //
// // Type Definition
// const typeDefs = `
// type Query {
//   characters: [Character!]!
// }
//
// type Character {
//   name: String!,
//   species: String!,
//   affiliation: affiliation!
//   weapons: [String!]
// }
//
// enum affiliation {
//   REBEL_ALLIANCE,
//   EMPIRE
// }
// `;
//
// // local storage of characters, this will be moved later
// const characters = [
//   {
//     name: "Han Solo",
//     species: "Human",
//     affiliation: "REBEL_ALLIANCE",
//     weapons: ["blaster rifle"]
//   },
//   {
//     name: "Chewbacca",
//     species: "Wookie",
//     affiliation: "REBEL_ALLIANCE",
//     weapons: ["blaster rifle", "bowcaster"]
//   }
// ];
//
// // resolving queries
// const resolvers = {
//   Query: {
//     characters: () => characters
//   },
//   Character: {
//     name: parent => parent.name,
//     species: parent => parent.species,
//     affiliation: parent => parent.affiliation,
//     weapons: parent => parent.weapons
//   }
// };
//
// // Server
// const server = new GraphQLServer({
//   typeDefs,
//   resolvers
// });
// server.start(() => console.log(`Server is running on http://localhost:4000`));

const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

// // Type Definition
// const typeDefs = `
// type Query {
//   character: String!
// }
// `;
//
// // Resolvers
// const resolvers = {
//   Query: {
//     character: () => `The force is strong with this API!`
//   }
// };
//
//
//
//
//type Query {
//   characters: [Character!]!
// }
//
//
// Type Definition
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

// local storage of characters, this will be moved later
const characters = [
  {
    name: "Han Solo",
    species: "Human",
    affiliation: "REBEL_ALLIANCE",
    weapon: "blaster rifle"
  },
  {
    name: "Chewbacca",
    species: "Wookie",
    affiliation: "REBEL_ALLIANCE",
    weapon: "bowcaster"
  }
];

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
