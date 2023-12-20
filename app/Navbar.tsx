'use client'

import Link from 'next/link'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'

const Navbar = () => {

  const currentPath = usePathname();
  const links = [
    {label: 'Dashboard', href: "/"},
    {label: 'Pitcher', href: "/pitcher"},
    {label: 'Batter', href: "/batter"},
    {label: 'VS', href: "/vs"},
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><AiFillBug /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => <Link key={link.href} href={link.href} 
            className={classNames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500': link.href !== currentPath,
                'hover:text-zinc-800 transition-colors': true
            })}>{link.label}</Link>)}
        </ul>
    </nav>
  )
}

export default Navbar