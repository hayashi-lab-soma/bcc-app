// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Rect, Label, Image } = initSchema(schema);

export {
  Rect,
  Label,
  Image
};