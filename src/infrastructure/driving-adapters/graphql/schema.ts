import { join } from 'path'
import { readdirSync, readFileSync } from 'fs'
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from './resolvers'

const gqlFiles = readdirSync(join(__dirname, './typesdefs')) // Leyendo el directorio

let typeDefs = ''

gqlFiles.forEach((file) => { // Recorremos cada archivo y los colocamos en la variable para pasarlo al schema
  typeDefs += readFileSync(join(__dirname, './typesdefs', file), {
    encoding: 'utf8'
  })
})

// Construyendo el schema apartir de lo que definimos en nuestro directorio /typedefs que antetiormente leimos y escribimos en una variable todoe el contenido
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
