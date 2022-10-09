// ESTE ARCHIVO SERVIRA PARA QUE LEVANTE TODO LO QUE HAY EN driving-adapters A EXCEPCION DE LA CONSOLA
// AQUI APLICAREMOS LOS MODULE-ALIAS
import 'module-alias/register'
import path from 'path'
import * as dotenv from 'dotenv'
import { TuttoDataFakerBackendApp } from './api-rest/TuttoDataFakerBackendApp'
import { TuttoDataFakerGraphQL } from './graphql/TuttoDataFakerGraphQL'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })

  new TuttoDataFakerBackendApp().start()
  new TuttoDataFakerGraphQL().start()
} catch (error) {
  console.log(error)
}
