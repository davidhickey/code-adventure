import {defineConfig, SchemaTypeDefinition} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { projectId, dataset } from "@/lib/sanity/api";
import {colorInput} from '@sanity/color-input'


export default defineConfig({
  name: 'default',
  title: 'Personal Website',

  projectId: projectId || '',
  dataset: dataset || '',
  basePath: '/studio',

  plugins: [structureTool(), visionTool(), colorInput()],

  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
})