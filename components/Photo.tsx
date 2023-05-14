import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '@supabase/auth-helpers-react'
import { Image } from '@/types/image'
import { Dialog, DialogActions, DialogContent, IconButton } from '@mui/material'
import BtnDeleteFiles from '@/components/BtnDeleteFiles'
import { LoadingButton } from '@mui/lab'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
interface PhotoProps {
  cdnUrl: string
  user: User
  imageName: Image['name']
  closeDialog?: () => void
}

export default function Photo({ cdnUrl, user, imageName, closeDialog }: PhotoProps) {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
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
      setLoading(true)
      const response = await fetch(cdnUrl + user.id + '/' + imageName)
      if (response.ok) {
        setImage(cdnUrl + user.id + '/' + imageName)
      } else {
        router.push('/photos')
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImage()
  }, [imageName])

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      {!image ? null : (
        <>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <IconButton onClick={handleClose}>
              <ArrowBackIcon />
            </IconButton>
            <BtnDeleteFiles
              title="Delete"
              aria-label="delete"
              startIcon={<DeleteIcon />}
              disabled={loading}
              ImagePathNames={[user.id + '/' + imageName]}
              success={() => handleClose()}
            />
          </DialogActions>
          <DialogContent
            sx={{ p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <img src={image} style={{ maxWidth: '100%' }} />
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}
