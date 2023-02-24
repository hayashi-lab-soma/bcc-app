import React, { useState, useEffect } from 'react'

import { PhotoList, PhotoFullScreenDialog, } from '../templates'
import { Storage } from 'aws-amplify'

const PhotosView = (props) => {

  const [photos, setPhotos] = useState([])
  const [urls, setUrls] = useState([])

  const [open, setOpen] = useState(false)
  const [isLoding, setLoding] = useState(false)
  const [url, setURL] = useState(null)

  const fetch = async () => {
    // console.debug('Fetch')
    try {
      const rawObjects = await Storage.list('raws/', { level: 'protected' })
      const thumbObjects = await Storage.list('thumbs/', { level: 'protected' })
      // console.debug(rawObjects.results)
      // console.debug(thumbObjects.results)

      const sortedRaws = rawObjects.results.sort((a, b) => -(a.lastModified.getTime() - b.lastModified.getTime()))
      const sortedThumbs = thumbObjects.results.sort((a, b) => -(a.lastModified.getTime() - b.lastModified.getTime()))

      Promise.all(
        sortedRaws.map((obj, i) => {
          return {
            title: obj.key.match(/\'.*?\'/),
            date: obj.lastModified,
            size: obj.size,
            raw: obj.key,
            thumb: sortedThumbs[i].key,
          }
        })
      ).then((photos) => {
        setPhotos(photos)
      })
      // console.log(photos)
    }
    catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    (async () => {
      return Promise.all(photos.map(async (photo, i) => {
        const url = await Storage.get(photo.thumb, { level: 'protected' })
        return url
      }))
    })()
      .then((urls) => {
        setUrls(urls)
      })
  }, [photos])

  return (
    <div>

      <PhotoList
        photos={photos}
        urls={urls}
        onFullScreen={async (i) => {
          setOpen(true)
          setLoding(true)
          const url = await Storage.get(photos[i].raw, { level: 'protected' })
          setLoding(false)
          setURL(url)
        }} />

      <PhotoFullScreenDialog
        open={open}
        onClose={() => { setOpen(false) }}
        isLoding={isLoding}
        url={url} />

    </div >
  )
}

export default PhotosView