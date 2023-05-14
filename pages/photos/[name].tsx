import { useRouter } from 'next/router'
import Photo from '@/components/Photo'
import { useUser } from '@supabase/auth-helpers-react'

const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
}

const CDNURL = `${env.supabaseUrl}/storage/v1/object/public/${env.bucketName}/`

export default function PhotoPage() {
  const router = useRouter()
  const user = useUser()
  const { name } = router.query

  const imageName = typeof name === 'string' ? name : ''

  if (!user) {
    return null
  }
  return <Photo cdnUrl={CDNURL} user={user} imageName={imageName} />
}
