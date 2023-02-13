// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Label, Photo, Rect, Location } = initSchema(schema);

export {
  Label,
  Photo,
  Rect,
  Location
};