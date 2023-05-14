import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Image } from '@/types/image'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { LoadingButtonProps } from '@mui/lab/LoadingButton'

interface BtnDeleteFilesProps extends LoadingButtonProps {
  ImagePathNames: Image['name'][]
  success: () => void
}

const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME as string

export default function BtnDeleteFiles({
  ImagePathNames,
  success,
  ...loadingButtonProps
}: BtnDeleteFilesProps) {
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
      color="error"
      loading={loading}
      disabled={!ImagePathNames.length}
      disableElevation
      onClick={() => deleteImages()}
      {...loadingButtonProps}
      sx={
        loadingButtonProps.children
          ? undefined
          : { '& .MuiButton-startIcon': { marginRight: 0 } }
      }
    >
      {loadingButtonProps.children}
    </LoadingButton>
  )
}
