
import React, { useState, useEffect } from 'react'

import { AppHeader, AppDrawer, } from '../templates'
import { PhotosView, PhotoPost } from '../views'

import { Toolbar } from '@mui/material'

import { Storage } from 'aws-amplify'

const Home = (props) => {

  const [photoObjects, setPhotoObjects] = useState([])
  const [photos, setPhotos] = useState([])

  const [drawer, setDrawer] = useState(false)

  const fetchS3Objects = async () => {
    try {
      const ret = await Storage.list('req/', { level: 'protected' })
      console.debug('Fetch s3 objects', ret)
      setPhotoObjects(ret.results)
    }
    catch (e) {
      console.error(e)
    }
  }

  const putS3Object = async (key, file) => {
    try {
      const ret = await Storage.put('req/' + key, file, { level: 'protected' })
      console.debug('Put s3 object', ret)
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

  useEffect(() => {
    console.debug('S3 first fetch')
    fetchS3Objects()
  }, [])

  useEffect(async () => {
    const tmp = photoObjects.sort((a, b) => -(a.lastModified.getTime() - b.lastModified.getTime()))

    await Promise.all(tmp.map(async (obj, idx) => {
      return await getS3ObjectURL(obj.key)
    }))
      .then((res) => {
        console.debug('Photo URLs', res)
        setPhotos(res)
      })

  }, [photoObjects])

  return (
    <div>
      <AppHeader
        username={props.username}
        onClickMenu={() => {
          !drawer ? setDrawer(true) : setDrawer(false)
        }} />

      <AppDrawer
        open={drawer} />

      <Toolbar />
      
      <main>
        {/* Views */}
        <PhotosView
          photos={photos} />

        <PhotoPost
          onSend={async (files) => {
            // files: list of File type
            await Promise.all(files.map(async (file, idx) => {
              const fname = file.name.split('.').shift() //get file name without explanation
              const type = file.name.split('.').pop()
              const date = new Date()
              const key = `${fname}_${date.getTime()}.${type}`
              // console.log(key)
              await putS3Object(key, file)
            }))

            fetchS3Objects()
          }} />
      </main>


    </div>
  )
}

export default Home