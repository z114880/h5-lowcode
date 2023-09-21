import { schemaType, pageConfigType } from './../../../types/Schema.d'

import ProjectBuilder from './generator/projectBuilder'

const generate = (schema: schemaType, config: pageConfigType) => {
  if (!schema) throw new Error('please input schema')
  const Project = new ProjectBuilder(schema, { config })
  Project.browserGenerate()
}
const preview = (schema: schemaType, config: pageConfigType) => {
  const Project = new ProjectBuilder(schema, { config })
  return { body: Project.addBody(), style: Project.CssStr }
}
const deploy = (schema: schemaType, config: pageConfigType) => {
  if (!schema) throw new Error('please input schema')
  const Project = new ProjectBuilder(schema, { config })
  return Project.deployGenerate()
}
export { generate, preview, deploy }
