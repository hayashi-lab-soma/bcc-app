import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Rect {
  readonly width?: number | null;
  readonly height?: number | null;
  constructor(init: ModelInit<Rect>);
}

export declare class Location {
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  constructor(init: ModelInit<Location>);
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
  readonly name: string;
  readonly rect: Rect;
  readonly size: number;
  readonly auther?: string | null;
  readonly autherId?: string | null;
  readonly key?: string | null;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly location?: Location | null;
  readonly album?: Album | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Image>);
  static copyOf(source: Image, mutator: (draft: MutableModel<Image>) => MutableModel<Image> | void): Image;
}

export declare class Album {
  readonly id: string;
  readonly name?: string | null;
  readonly auther?: string | null;
  readonly autherId?: string | null;
  readonly images?: (Image | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Album, AlbumMetaData>);
  static copyOf(source: Album, mutator: (draft: MutableModel<Album, AlbumMetaData>) => MutableModel<Album, AlbumMetaData> | void): Album;
}