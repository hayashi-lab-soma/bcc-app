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

type EagerPhoto = {
  readonly id: string;
  readonly name: string;
  readonly rect: Rect;
  readonly size: number;
  readonly key?: string | null;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPhoto = {
  readonly id: string;
  readonly name: string;
  readonly rect: Rect;
  readonly size: number;
  readonly key?: string | null;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Photo = LazyLoading extends LazyLoadingDisabled ? EagerPhoto : LazyPhoto

export declare const Photo: (new (init: ModelInit<Photo>) => Photo) & {
  copyOf(source: Photo, mutator: (draft: MutableModel<Photo>) => MutableModel<Photo> | void): Photo;
}