// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Photo, Rect, Location } = initSchema(schema);

export {
  Photo,
  Rect,
  Location
};