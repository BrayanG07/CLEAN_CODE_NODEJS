import { userMuttations, userQueries } from './user'

const resolvers = {
  Query: {
    ...userQueries
  },
  Mutation: {
    ...userMuttations
  }
}

export default resolvers
