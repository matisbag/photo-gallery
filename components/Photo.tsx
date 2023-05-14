import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Image } from '@/types/image'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  LinearProgress,
} from '@mui/material'

interface PhotoProps {
  cdnUrl: string
  user: User
  imageName: Image['name']
  closeDialog?: () => void
}

export default function Photo({ cdnUrl, user, imageName, closeDialog }: PhotoProps) {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(true)
  const [image, setImage] = useState<string | null>(null)

  const handleClose = () => {
    setOpen(false)
    if (closeDialog) {
      const newUrl = `/photos`
      window.history.pushState(null, '', newUrl)
      closeDialog()
    } else {
      router.push('/photos')
    }
  }

  async function fetchImage() {
    if (imageName) {
      const response = await fetch(cdnUrl + user.id + '/' + imageName)
      if (response.ok) {
        setImage(cdnUrl + user.id + '/' + imageName)
      } else {
        router.push('/photos')
      }
    }
  }

  useEffect(() => {
    fetchImage()
  }, [imageName])

  return (
    <Dialog open={open} onClose={handleClose}>
      {!image ? (
        <LinearProgress sx={{ mt: 2 }} />
      ) : (
        <DialogContent sx={{ p: 0 }}>
          <img src={image} style={{ maxWidth: '100%' }} />
        </DialogContent>
      )}
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}
