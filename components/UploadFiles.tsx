import { useState, useRef } from 'react'
import { LoadingButton } from '@mui/lab'
import { User } from '@supabase/supabase-js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

interface UploadFilesProps {
  user: User
  reloadImages: () => void
}

const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME as string

export default function UploadFiles({ user, reloadImages }: UploadFilesProps) {
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(false)
  const storage = supabase.storage.from(bucketName)
  const inputFileRef = useRef<HTMLInputElement>(null)

  async function uploadImages(files: FileList | null) {
    console.log(files)
    if (files) {
      setLoading(true)

      for (const file of files) {
        const { error } = await storage.upload(user.id + '/' + file.name, file)
        if (error) {
          alert(error.message)
        }
      }

      setLoading(false)
      reloadImages()
      inputFileRef.current!.value = ''
    }
  }

  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      component="label"
      disableElevation
    >
      Upload Images
      <input
        type="file"
        hidden
        accept="image/png, image/jpeg"
        onChange={(e) => uploadImages(e.target.files)}
        ref={inputFileRef}
      />
    </LoadingButton>
  )
}
