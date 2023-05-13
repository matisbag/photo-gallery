import { Container, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import UploadFiles from '@/components/UploadFiles'
import GalleryContainer from '@/components/GalleryContainer'
import { Image } from '@/types/image'

export default function Photos() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const storage = supabase.storage.from(
    process.env.NEXT_PUBLIC_BUCKET_NAME as string
  )
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<Image[]>([])
  const [selectedImageIds, setSelectedImageIds] = useState<Image['id'][]>([])

  async function fetchImages() {
    if (user) {
      setLoading(true)
      const { data, error } = await storage.list(user.id, {
        limit: 9,
      })
      if (error) {
        alert(error.message)
      } else {
        console.log(data)
        setImages(data)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [user])

  return (
    <Container maxWidth="lg">
      {user ? (
        <>
          <UploadFiles user={user} reloadImages={() => fetchImages()} />
          <LinearProgress
            sx={{ visibility: loading ? 'visible' : 'hidden', marginTop: 2 }}
          />
          <GalleryContainer
            images={images}
            selectedImageIds={selectedImageIds}
            setSelectedImageIds={(imageIds) => setSelectedImageIds(imageIds)}
          />
        </>
      ) : null}
    </Container>
  )
}
