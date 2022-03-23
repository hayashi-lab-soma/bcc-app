/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLabel = /* GraphQL */ `
  query GetLabel($id: ID!) {
    getLabel(id: $id) {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listLabels = /* GraphQL */ `
  query ListLabels(
    $filter: ModelLabelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLabels = /* GraphQL */ `
  query SyncLabels(
    $filter: ModelLabelFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLabels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      id
      name
      size
      auther
      autherid
      key
      location {
        latitude
        longitude
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      albumImagesId
    }
  }
`;
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        size
        auther
        autherid
        key
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        albumImagesId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncImages = /* GraphQL */ `
  query SyncImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncImages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        size
        auther
        autherid
        key
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        albumImagesId
      }
      nextToken
      startedAt
    }
  }
`;
export const getAlbum = /* GraphQL */ `
  query GetAlbum($id: ID!) {
    getAlbum(id: $id) {
      id
      name
      auther
      autherid
      images {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listAlbums = /* GraphQL */ `
  query ListAlbums(
    $filter: ModelAlbumFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        auther
        autherid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAlbums = /* GraphQL */ `
  query SyncAlbums(
    $filter: ModelAlbumFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAlbums(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        auther
        autherid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
