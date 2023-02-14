
import React, { useState, useEffect } from 'react'

import { AppBase } from '../templates'
import { InferencedPhotos, PhotoPost } from '../views'

import { Toolbar } from '@mui/material'

import { Storage, DataStore, } from 'aws-amplify'
import { Photo, Rect, } from '../../models'

const Home = (props) => {

  const [thumbnailObjects, setThumbnailObjects] = useState([])
  const [thumbURLs, setThumbURLs] = useState([])

  const fetchS3Objects = async () => {
    try {
      const ret = await Storage.list('thumb_', { level: 'protected' })
      console.debug('Fetch s3 objects', ret)
      const sorted_results = ret.results.sort((a, b) => -(a.lastModified.getTime() - b.lastModified.getTime()))
      setThumbnailObjects(sorted_results)
    }
    catch (e) {
      console.error(e)
    }
  }

  const putS3Object = async (key, file) => {
    try {
      console.debug('Put s3 object: ', key, file)
      return await Storage.put('' + key, file, { level: 'private' })
    }
    catch (e) {
      console.error(e)
    }
  }

  const getS3ObjectURL = async (key) => {
    try {
      const ret = await Storage.get(key, { level: 'protected' })
      return ret
    }
    catch (e) {
      console.error(e)
    }
  }

  const loadImage = async (src) => {
    console.debug('LoadImage: ', src)

    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        })
      }

      img.onerror = (e) => { reject(e) }
      img.src = URL.createObjectURL(src);
    })
  }

  useEffect(() => {
    console.debug('S3 first fetch')
    fetchS3Objects()
  }, [])

  useEffect(async () => {
    // const tmp = photoObjects.sort((a, b) => -(a.lastModified.getTime() - b.lastModified.getTime()))

    // await Promise.all(tmp.map(async (obj, idx) => {
    await Promise.all(thumbnailObjects.map(async (obj, idx) => {
      return await getS3ObjectURL(obj.key)
    }))
      .then((res) => {
        console.debug('Photo URLs', res)
        setThumbURLs(res)
      })

  }, [thumbnailObjects])

  return (
    <div>
      <header>
        <AppBase
          username={props.username} />
      </header>

      <main>

        <InferencedPhotos
          photos={thumbnailObjects}
          urls={thumbURLs} />

        <PhotoPost
          onSend={async (files) => {
            // files: list of File type
            await Promise.all(files.map(async (file, idx) => {

              const fname = file.name.split('.').shift() //get file name without explanation
              const type = file.name.split('.').pop()
              const fsize = file.size
              const date = new Date()
              const key = `${fname}_${date.getTime()}.${type}`

              const { w, h } = await loadImage(file)
              const mRect = new Rect({
                width: w,
                height: h
              })
              const ret = await putS3Object(key, file)

              // DataStore.save(
              //   new Photo({
              //     name: fname,
              //     rect: mRect,
              //     size: fsize,
              //   })
              // )
              //   .then((res) => {
              //     console.debug(res)
              //   })
              //   .catch((e) => {
              //     console.error(e)
              //   })
            }))

            // fetchS3Objects()
          }} />
      </main>

    </div>
  )
}

export default Home