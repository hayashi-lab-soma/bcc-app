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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
