import { Container, ImageList, ImageListItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

interface ImageData {
  id: string
  name: string
  url?: string
}

export default function Photos() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const storage = supabase.storage.from('test-public')
  const [images, setImages] = useState<ImageData[]>([])

  async function fetchImages() {
    const { data, error } = await storage.list(
      'f5e47da3-ea21-4722-9dec-261d0280c114',
      {
        limit: 100,
      }
    )
    if (error) {
      console.log(error)
    } else {
      console.log(data)
      const imagesWithUrl = await Promise.all(
        data.map(async (image) => {
          const url = await storage.getPublicUrl(
            'f5e47da3-ea21-4722-9dec-261d0280c114/' + image.name
          ).data?.publicUrl
          return { ...image, url }
        })
      )
      console.log(imagesWithUrl)
      setImages(imagesWithUrl)
      console.log(user)
    }
  }

  useEffect(() => {
    if (user) {
      fetchImages()
    }
  }, [user])

  return (
    <Container maxWidth="lg">
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {images.map((image) => (
          <ImageListItem key={image.id}>
            {image.name}
            <img
              src={image.url}
              srcSet={image.url}
              alt={image.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  )
}
