// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Label, Image, Album, Rect, Location } = initSchema(schema);

export {
  Label,
  Image,
  Album,
  Rect,
  Location
};