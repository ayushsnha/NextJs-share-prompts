'use client';

import { useState, useEffect, ChangeEvent } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }: any) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post: any) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/prompt?search=${searchText}`, {
                method: 'GET',
                headers: {
                    "Cache-Control": "no-store"
                }
            });
            const data = await response.json();

            setPosts(data)
        }

        fetchPosts()
    }, [searchText])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or username'
                    value={searchText}
                    onChange={(e) => handleSearchChange(e)}
                    required
                    className='search_input peer'
                />
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={() => { }}
            />
        </section>
    )
}

export default Feed