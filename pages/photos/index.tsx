import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Checkbox,
} from '@mui/material'
import { parseISO, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

interface ImageData {
  id: string
  name: string
  url?: string
  created_at: string
}

export default function Photos() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const storage = supabase.storage.from('test-public')
  const [images, setImages] = useState<ImageData[]>([])

  async function fetchImages() {
    if (user) {
      const { data, error } = await storage.list(user.id, {
        limit: 100,
      })
      if (error) {
        console.log(error)
      } else {
        // console.log(data)
        const imagesWithUrl = await Promise.all(
          data.map((image) => {
            const url = storage.getPublicUrl(user.id + '/' + image.name).data
              ?.publicUrl
            return { ...image, url }
          })
        )
        console.log(imagesWithUrl)
        setImages(imagesWithUrl)
      }
    }
  }

  useEffect(() => {
    fetchImages()
  }, [user])

  return (
    <Container maxWidth="lg">
      <ImageList cols={3} gap={8}>
        {images.map((image) => (
          <ImageListItem key={image.id} sx={{ borderRadius: 8 }}>
            <img
              src={image.url}
              srcSet={image.url}
              alt={image.name}
              style={{ borderRadius: 8 }}
            />
            <ImageListItemBar
              title="Product"
              sx={{
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              actionIcon={<Checkbox />}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  )
}
