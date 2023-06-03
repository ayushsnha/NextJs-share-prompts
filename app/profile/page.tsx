'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Profile as ProfileComponent } from '@components'

const Profile = () => {

    const { data: session }: any = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([])

    const handleEdit = (post: any) => {
        router.push(`/update-prompt?id=${post._id}`)

    }

    const handleDelete = async (post: any) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPost = posts.filter((p: any) => p._id !== post._id);

                setPosts(filteredPost)
            } catch (err) {
                console.log(err)
            }
        }

    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`, {
                method: 'GET',
                headers: {
                    "Cache-Control": "no-store"
                }
            });
            const data = await response.json();

            setPosts(data);
        }
        if (session?.user.id)
            fetchPosts();
    }, [session?.user.id])

    return (
        <ProfileComponent
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default Profile