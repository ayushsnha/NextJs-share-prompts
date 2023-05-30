"use client"

import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Form } from '@components'

const CreatePrompt = () => {

  const { data: session } = useSession();
  const router = useRouter();


  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  const createPrompt = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id || '',
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}

    />
  )
}

export default CreatePrompt