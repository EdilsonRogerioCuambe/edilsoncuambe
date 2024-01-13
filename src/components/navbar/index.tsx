'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBars, FaGithub, FaBlog } from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'
import { FaXmark } from 'react-icons/fa6'
import { FiHome } from 'react-icons/fi'
import { IoIosContact } from 'react-icons/io'

const links = [
  { href: '/', label: 'Home', icon: <FiHome /> },
  { href: '/blogs', label: 'Blogs', icon: <FaBlog /> },
  { href: '/sobre', label: 'Sobre', icon: <FiHome /> },
  { href: '/contato', label: 'Contactos', icon: <IoIosContact /> },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="bg-[#121214] fixed top-0 left-0 right-0">
      <nav className="px-4 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold uppercase">
          Edilson <span className="uppercase text-green-400">Cuambe</span>
        </Link>
        <ul className="md:flex gap-12 textlg hidden">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-xl ${
                  pathname === href
                    ? 'border-b-4 border-green-400 transition-all duration-300 ease-in-out text-[#c4c4cc] font-bold'
                    : 'text-[#c4c4cc] transition-all duration-300 ease-in-out'
                } hover:text-green-400`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="lg:flex gap-4 items-center hidden">
          <a
            title="Ir para o meu perfil do Github"
            href="https://github.com/EdilsonRogerioCuambe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-purple-400 hover:text-green-400"
          >
            <FaGithub />
          </a>
          <a
            title="Ir para o meu perfil do Linkedin"
            href="https://www.linkedin.com/in/edilson-rog%C3%A9rio-cuambe-340140219/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-purple-400 hover:text-green-400"
          >
            <BsLinkedin />
          </a>
        </div>

        <div className="md:hidden">
          <button
            title="Abrir Menu"
            type="button"
            className="cursor-pointer"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <FaXmark className="text-xl text-gray-400 w-5 h-5 hover:text-gray-200 transition-all duration-300 ease-in-out" />
            ) : (
              <FaBars className="text-xl text-gray-400 w-5 h-5 hover:text-gray-200 transition-all duration-300 ease-in-out" />
            )}
          </button>
        </div>
      </nav>
      <div>
        <ul
          className={`md:hidden gap-12 text-lg block space-x-4 px-4 py-6 mt-10 ${
            isOpen
              ? 'fixed top-0 left-0 right-0 w-full transition-all ease-in-out duration-500 bg-[#121214] z-50'
              : 'hidden'
          }`}
        >
          {links.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-xl flex items-center ${
                  pathname === href
                    ? 'border-b-4 border-green-400 transition-all duration-300 ease-in-out text-[#c4c4cc] font-bold'
                    : 'text-[#c4c4cc] transition-all duration-300 ease-in-out'
                } hover:text-green-400`}
              >
                <span className="mr-2">{icon}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
