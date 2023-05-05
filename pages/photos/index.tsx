import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Checkbox,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

interface ImageData {
  id: string
  name: string
  created_at: string
}

const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
}

const CDNURL = `${env.supabaseUrl}/storage/v1/object/public/${env.bucketName}/`

export default function Photos() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const storage = supabase.storage.from(env.bucketName)
  const [images, setImages] = useState<ImageData[]>([])
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([])

  async function fetchImages() {
    if (user) {
      const { data, error } = await storage.list(user.id, {
        limit: 9,
      })
      if (error) {
        alert(error.message)
      } else {
        console.log(data)
        setImages(data)
      }
    }
  }

  useEffect(() => {
    fetchImages()
  }, [user])

  function handleImageSelect(imageId: string) {
    setSelectedImageIds((selectedIds) => {
      if (selectedIds.includes(imageId)) {
        return selectedIds.filter((id) => id !== imageId)
      } else {
        return [...selectedIds, imageId]
      }
    })
  }

  return (
    <Container maxWidth="lg">
      {user ? (
        <ImageList
          sx={{
            gridTemplateColumns:
              'repeat(auto-fill, minmax(285px, 1fr))!important',
          }}
          gap={8}
        >
          {images.map((image) => (
            <ImageListItem
              key={image.id}
              sx={{
                borderRadius: 8,
                '&:hover .MuiImageListItemBar-root': { opacity: 1 },
              }}
            >
              <img
                src={CDNURL + user.id + '/' + image.name}
                alt={image.name}
                style={{ borderRadius: 8 }}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  opacity: 0,
                  transition: 'opacity 0.2s ease-in-out',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  height: 70,
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 80%)',
                }}
                position="top"
              />
              <ImageListItemBar
                sx={{
                  opacity: selectedImageIds.includes(image.id) ? 1 : 0,
                  transition: 'opacity 0.2s ease-in-out',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  background: 'transparent',
                }}
                position="top"
                actionIcon={
                  <Checkbox
                    sx={{ color: 'white' }}
                    checked={selectedImageIds.includes(image.id)}
                    onChange={() => handleImageSelect(image.id)}
                  />
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : null}
    </Container>
  )
}
