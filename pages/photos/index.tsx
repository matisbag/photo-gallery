import { useEffect, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Box, Container, LinearProgress } from '@mui/material'
import { Image } from '@/types/image'
import BtnUploadFiles from '@/components/BtnUploadFiles'
import GalleryContainer from '@/components/GalleryContainer'
import BtnDeleteFiles from '@/components/BtnDeleteFiles'

export default function Photos() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const storage = supabase.storage.from(process.env.NEXT_PUBLIC_BUCKET_NAME as string)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<Image[]>([])
  const [selectedImageNames, setSelectedImageNames] = useState<Image['name'][]>([])

  async function fetchImages() {
    if (user) {
      setLoading(true)
      const { data, error } = await storage.list(user.id)

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <BtnUploadFiles user={user} reloadImages={() => fetchImages()} />
            <BtnDeleteFiles
              ImagePathNames={selectedImageNames}
              success={() => {
                setSelectedImageNames([])
                fetchImages()
              }}
              variant="contained"
            >
              Delete {!!selectedImageNames.length && `(${selectedImageNames.length})`}
            </BtnDeleteFiles>
          </Box>
          <LinearProgress sx={{ visibility: loading ? 'visible' : 'hidden', mt: 2 }} />
          <GalleryContainer
            user={user}
            images={images}
            selectedImageNames={selectedImageNames}
            setSelectedImageNames={(imageIds) => setSelectedImageNames(imageIds)}
            fetchImages={() => fetchImages()}
          />
        </>
      ) : null}
    </Container>
  )
}
