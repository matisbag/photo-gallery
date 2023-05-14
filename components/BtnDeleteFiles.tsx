import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Image } from '@/types/image'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

interface BtnDeleteFilesProps {
  ImagePathNames: Image['name'][]
  success: () => void
}

const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME as string

export default function BtnDeleteFiles({ ImagePathNames, success }: BtnDeleteFilesProps) {
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(false)
  const storage = supabase.storage.from(bucketName)

  async function deleteImages() {
    if (ImagePathNames.length) {
      setLoading(true)

      const { error } = await storage.remove(ImagePathNames)
      if (error) {
        alert(error.message)
      } else {
        success()
      }

      setLoading(false)
    }
  }

  return (
    <LoadingButton
      variant="contained"
      color="error"
      loading={loading}
      disabled={!ImagePathNames.length}
      component="label"
      disableElevation
      onClick={() => deleteImages()}
    >
      Delete {!!ImagePathNames.length && `(${ImagePathNames.length})`}
    </LoadingButton>
  )
}
