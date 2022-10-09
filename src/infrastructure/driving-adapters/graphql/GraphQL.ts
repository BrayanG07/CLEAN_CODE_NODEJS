import express from 'express'
import * as http from 'http'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'

export class GraphQL {
  private readonly _port: string
  private readonly _app: express.Express
  private _httpServer?: http.Server
  private readonly _apolloServer: ApolloServer // CLIENTE DE GRAPHQL

  constructor (port: string) {
    this._port = port
    this._app = express()
    this._apolloServer = new ApolloServer({
      schema
    })
  }

  async listen (): Promise<void> {
    await this._apolloServer.start() // INICIANDO EL SERVIDOR DE APOLLO

    // APLICAR MIDLEWARE CON APOLLOSERVER
    this._apolloServer.applyMiddleware({
      app: this._app,
      path: '/tutto-data-faker-graphql' // ESTABLECEMOS LA URL
    })

    return await new Promise(resolve => {
      this._httpServer = this._app.listen(this._port, () => {
        console.log(
          `graphQL App is running at http://localhost:${this._port}${this._apolloServer.graphqlPath}` // graphqlPath = '/tutto-data-faker-graphql'
        )
        console.log(' Press CTRL + C to stop\n')
        resolve() // resolve() = TODO ESTA BIEN
      })
    })
  }

  async stop (): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this._httpServer != null) {
        this._httpServer.close(error => {
          if (error != null) {
            return reject(error)// resolve() = SE PRODUJO UN ERROR
          }
          return resolve() // resolve() = TODO ESTA BIEN
        })
      }

      return resolve() // resolve() = TODO ESTA BIEN
    })
  }
}
