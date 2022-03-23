/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLabel = /* GraphQL */ `
  subscription OnCreateLabel {
    onCreateLabel {
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
  subscription OnUpdateLabel {
    onUpdateLabel {
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
  subscription OnDeleteLabel {
    onDeleteLabel {
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
  subscription OnCreateImage {
    onCreateImage {
      id
      name
      size
      auther
      autherid
      key
      thumbnail
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
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage {
    onUpdateImage {
      id
      name
      size
      auther
      autherid
      key
      thumbnail
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
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage {
    onDeleteImage {
      id
      name
      size
      auther
      autherid
      key
      thumbnail
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
export const onCreateAlbum = /* GraphQL */ `
  subscription OnCreateAlbum {
    onCreateAlbum {
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
export const onUpdateAlbum = /* GraphQL */ `
  subscription OnUpdateAlbum {
    onUpdateAlbum {
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
export const onDeleteAlbum = /* GraphQL */ `
  subscription OnDeleteAlbum {
    onDeleteAlbum {
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
