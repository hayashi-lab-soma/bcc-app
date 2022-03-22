import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Rect {
  readonly x?: number | null;
  readonly y?: number | null;
  readonly width?: number | null;
  readonly height?: number | null;
  constructor(init: ModelInit<Rect>);
}

type LabelMetaData = {
  readOnlyFields;
}

type ImageMetaData = {
  readOnlyFields;
}

type AlbumMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
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
  readonly auther?: string | null;
  readonly name?: string | null;
  readonly size?: number | null;
  readonly url?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly albumImagesId?: string | null;
  constructor(init: ModelInit<Image>);
  static copyOf(source: Image, mutator: (draft: MutableModel<Image>) => MutableModel<Image> | void): Image;
}

export declare class Album {
  readonly id: string;
  readonly images?: (Image | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Album, AlbumMetaData>);
  static copyOf(source: Album, mutator: (draft: MutableModel<Album, AlbumMetaData>) => MutableModel<Album, AlbumMetaData> | void): Album;
}