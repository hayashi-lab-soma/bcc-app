import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type RectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabelMetaData = {
  readOnlyFields;
}

type ImageMetaData = {
  readOnlyFields: 'updatedAt';
}

export declare class Rect {
  readonly id: string;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Rect, RectMetaData>);
  static copyOf(source: Rect, mutator: (draft: MutableModel<Rect, RectMetaData>) => MutableModel<Rect, RectMetaData> | void): Rect;
}

export declare class Label {
  readonly id: string;
  readonly name?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Label>);
  static copyOf(source: Label, mutator: (draft: MutableModel<Label>) => MutableModel<Label> | void): Label;
}

export declare class Image {
  readonly id: string;
  readonly auth?: string;
  readonly name?: string;
  readonly size?: number;
  readonly path?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Image, ImageMetaData>);
  static copyOf(source: Image, mutator: (draft: MutableModel<Image, ImageMetaData>) => MutableModel<Image, ImageMetaData> | void): Image;
}