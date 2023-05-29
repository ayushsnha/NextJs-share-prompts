"use client";

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession();
    const [provider, setProvider] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setProviders = async () => {
            const response: any = await getProviders();
            setProvider(response)
        }
        setProviders()
    }, []);


    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image
                    alt='logo'
                    width={30}
                    height={30}
                    className='object-contain'
                    src='/assets/images/logo.svg'
                />
                <p className='logo_text'>Promtopia</p>
            </Link>

            {/* Desktop Navigation */}

            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href='/create-prompt' className='black_btn'>
                            Create Post
                        </Link>
                        <button type='button' onClick={() => signOut()} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href='/profile'>
                            <Image
                                src={session?.user.image || ''}
                                width={37}
                                height={37}
                                alt='profile'
                                className='rounded-full'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {provider &&
                            Object.values(provider).map((p: any) => (
                                <button
                                    type='button'
                                    key={p.name}
                                    onClick={() => signIn(p.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )}
            </div>
            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image || ''}
                            width={37}
                            height={37}
                            alt='profile'
                            className='rounded-full'
                            onClick={() => setToggleDropdown(prev => !prev)}
                        />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false)
                                        signOut()
                                    }}
                                    className='black_btn mt-5 w-full'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {provider &&
                            Object.values(provider).map((p: any) => (
                                <button
                                    type='button'
                                    key={p.name}
                                    onClick={() => signIn(p.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )}
            </div>
        </nav >
    )
}

export default Nav