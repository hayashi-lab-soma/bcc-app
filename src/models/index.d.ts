import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Location {
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  constructor(init: ModelInit<Location>);
}

type RectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EventMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabelMetaData = {
  readOnlyFields;
}

type ImageMetaData = {
  readOnlyFields;
}

export declare class Rect {
  readonly id: string;
  readonly x?: number | null;
  readonly y?: number | null;
  readonly width?: number | null;
  readonly height?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Rect, RectMetaData>);
  static copyOf(source: Rect, mutator: (draft: MutableModel<Rect, RectMetaData>) => MutableModel<Rect, RectMetaData> | void): Rect;
}

export declare class Event {
  readonly id: string;
  readonly name?: string | null;
  readonly organizer?: string | null;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly place?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Event, EventMetaData>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event, EventMetaData>) => MutableModel<Event, EventMetaData> | void): Event;
}

export declare class Label {
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Label>);
  static copyOf(source: Label, mutator: (draft: MutableModel<Label>) => MutableModel<Label> | void): Label;
}

export declare class Image {
  readonly id: string;
  readonly auth?: string | null;
  readonly name?: string | null;
  readonly size?: number | null;
  readonly location?: Location | null;
  readonly url?: string | null;
  readonly updatedAt?: string | null;
  readonly createdAt?: string | null;
  constructor(init: ModelInit<Image>);
  static copyOf(source: Image, mutator: (draft: MutableModel<Image>) => MutableModel<Image> | void): Image;
}