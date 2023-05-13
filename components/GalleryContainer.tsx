import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Checkbox,
} from '@mui/material'
import { useUser } from '@supabase/auth-helpers-react'
import { Image } from '@/types/image'

const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
}

const CDNURL = `${env.supabaseUrl}/storage/v1/object/public/${env.bucketName}/`

interface GalleryContainerProps {
  images: Image[]
  selectedImageIds: Image['id'][]
  setSelectedImageIds: (imageIds: Image['id'][]) => void
}

export default function GalleryContainer({
  images,
  selectedImageIds,
  setSelectedImageIds,
}: GalleryContainerProps) {
  const user = useUser()

  function handleImageSelect(imageId: string) {
    if (selectedImageIds.includes(imageId)) {
      setSelectedImageIds(selectedImageIds.filter((id) => id !== imageId))
    } else {
      setSelectedImageIds([...selectedImageIds, imageId])
    }
  }

  return (
    <ImageList
      sx={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(285px, 1fr))!important',
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
            src={CDNURL + user?.id + '/' + image.name}
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
  )
}
