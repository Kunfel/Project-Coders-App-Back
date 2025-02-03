import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    avatar: String
    role: String!
    is_verified: Boolean!
    score: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Challenge {
    _id: ID!
    title: String!
    category: String!
    description: String!
    difficulty: String!
    manager: User!
    code: CodeContent!
    tests: [Test!]!
    solutionRate: Float
    status: String
    createdAt: String!
    updatedAt: String!
  }

  type CodeContent {
    functionName: String!
    starter: String!
    solution: String!
  }

  type Test {
    input: String!
    expected: String!
  }

  type Submission {
    _id: ID!
    challenge: Challenge!
    coder: User!
    submittedCode: String!
    passed: Boolean!
    score: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    challenges(category: String): [Challenge!]!
    challenge(id: ID!): Challenge
    categories: [String!]!
  }
`);

export default schema;