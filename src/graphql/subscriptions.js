/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLabel = /* GraphQL */ `
  subscription OnCreateLabel($filter: ModelSubscriptionLabelFilterInput) {
    onCreateLabel(filter: $filter) {
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
export const onUpdateLabel = /* GraphQL */ `
  subscription OnUpdateLabel($filter: ModelSubscriptionLabelFilterInput) {
    onUpdateLabel(filter: $filter) {
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
export const onDeleteLabel = /* GraphQL */ `
  subscription OnDeleteLabel($filter: ModelSubscriptionLabelFilterInput) {
    onDeleteLabel(filter: $filter) {
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
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage($filter: ModelSubscriptionImageFilterInput) {
    onCreateImage(filter: $filter) {
      id
      name
      rect {
        width
        height
      }
      size
      auther
      autherId
      key
      date
      time
      location {
        latitude
        longitude
      }
      album {
        id
        name
        auther
        autherId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage($filter: ModelSubscriptionImageFilterInput) {
    onUpdateImage(filter: $filter) {
      id
      name
      rect {
        width
        height
      }
      size
      auther
      autherId
      key
      date
      time
      location {
        latitude
        longitude
      }
      album {
        id
        name
        auther
        autherId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage($filter: ModelSubscriptionImageFilterInput) {
    onDeleteImage(filter: $filter) {
      id
      name
      rect {
        width
        height
      }
      size
      auther
      autherId
      key
      date
      time
      location {
        latitude
        longitude
      }
      album {
        id
        name
        auther
        autherId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
export const onCreateAlbum = /* GraphQL */ `
  subscription OnCreateAlbum($filter: ModelSubscriptionAlbumFilterInput) {
    onCreateAlbum(filter: $filter) {
      id
      name
      auther
      autherId
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
export const onUpdateAlbum = /* GraphQL */ `
  subscription OnUpdateAlbum($filter: ModelSubscriptionAlbumFilterInput) {
    onUpdateAlbum(filter: $filter) {
      id
      name
      auther
      autherId
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
export const onDeleteAlbum = /* GraphQL */ `
  subscription OnDeleteAlbum($filter: ModelSubscriptionAlbumFilterInput) {
    onDeleteAlbum(filter: $filter) {
      id
      name
      auther
      autherId
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
