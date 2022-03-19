// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Rect, Event, Label, Image, Location } = initSchema(schema);

export {
  Rect,
  Event,
  Label,
  Image,
  Location
};