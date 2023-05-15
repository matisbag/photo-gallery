import { useMemo, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Image } from '@/types/image'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Checkbox,
  useMediaQuery,
} from '@mui/material'
import Photo from '@/components/Photo'
import theme from '@/utils/muiTheme'

const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
}

const CDNURL = `${env.supabaseUrl}/storage/v1/object/public/${env.bucketName}/`

interface GalleryContainerProps {
  user: User
  images: Image[]
  selectedImageNames: Image['id'][]
  setSelectedImageNames: (imageIds: Image['id'][]) => void
  fetchImages: () => void
}

export default function GalleryContainer({
  user,
  images,
  selectedImageNames,
  setSelectedImageNames,
  fetchImages,
}: GalleryContainerProps) {
  const [imageName, setImageName] = useState<Image['name'] | null>(null)

  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
  const cols = isSmScreen ? 1 : isMdScreen ? 2 : 3

  const getImagePath = useMemo(() => {
    return (imageName: Image['name']) => `${user.id}/${imageName}`
  }, [user.id])

  function handleImageClick(imageName: Image['name']) {
    // open photo dialog + change url
    const newUrl = `/photos/${imageName}`
    window.history.pushState(null, '', newUrl)
    setImageName(imageName)
  }

  function handleImageSelect(
    imageName: Image['id'],
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation()
    if (selectedImageNames.includes(imageName)) {
      setSelectedImageNames(selectedImageNames.filter((name) => name !== imageName))
    } else {
      setSelectedImageNames([...selectedImageNames, imageName])
    }
  }

  return (
    <>
      {imageName && (
        <Photo
          cdnUrl={CDNURL}
          user={user}
          imageName={imageName}
          closeDialog={() => {
            setImageName(null)
            fetchImages()
          }}
        />
      )}
      <ImageList variant="masonry" cols={cols} gap={8}>
        {images.map((image) => (
          <ImageListItem
            key={image.id}
            sx={{
              '&:hover .MuiImageListItemBar-root': { opacity: 1 },
              cursor: 'pointer',
            }}
            onClick={() => handleImageClick(image.name)}
          >
            <img
              src={CDNURL + getImagePath(image.name)}
              alt={image.name}
              style={{ borderRadius: 8, maxHeight: 700 }}
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
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 80%)',
              }}
              position="top"
            />
            <ImageListItemBar
              sx={{
                opacity: selectedImageNames.includes(getImagePath(image.name)) ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                background: 'transparent',
              }}
              position="top"
              actionIcon={
                <Checkbox
                  sx={{ color: 'white' }}
                  checked={selectedImageNames.includes(getImagePath(image.name))}
                  onClick={(e) => handleImageSelect(getImagePath(image.name), e)}
                />
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  )
}
