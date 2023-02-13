import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type EagerRect = {
  readonly width?: number | null;
  readonly height?: number | null;
}

type LazyRect = {
  readonly width?: number | null;
  readonly height?: number | null;
}

export declare type Rect = LazyLoading extends LazyLoadingDisabled ? EagerRect : LazyRect

export declare const Rect: (new (init: ModelInit<Rect>) => Rect)

type EagerLocation = {
  readonly latitude?: number | null;
  readonly longitude?: number | null;
}

type LazyLocation = {
  readonly latitude?: number | null;
  readonly longitude?: number | null;
}

export declare type Location = LazyLoading extends LazyLoadingDisabled ? EagerLocation : LazyLocation

export declare const Location: (new (init: ModelInit<Location>) => Location)





type EagerLabel = {
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLabel = {
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Label = LazyLoading extends LazyLoadingDisabled ? EagerLabel : LazyLabel

export declare const Label: (new (init: ModelInit<Label>) => Label) & {
  copyOf(source: Label, mutator: (draft: MutableModel<Label>) => MutableModel<Label> | void): Label;
}

type EagerImage = {
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyImage = {
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Image = LazyLoading extends LazyLoadingDisabled ? EagerImage : LazyImage

export declare const Image: (new (init: ModelInit<Image>) => Image) & {
  copyOf(source: Image, mutator: (draft: MutableModel<Image>) => MutableModel<Image> | void): Image;
}