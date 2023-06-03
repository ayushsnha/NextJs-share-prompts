'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Profile as ProfileComponent } from '@components'

const Profile = () => {

    const { data: session }: any = useSession();
    const [posts, setPosts] = useState([])

    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data)
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