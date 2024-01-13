'use client'
import { useEffect, useCallback, useState } from 'react'
import Link from 'next/link'
import { FaGithub, FaBlog } from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'
import { FiHome } from 'react-icons/fi'
import { IoIosContact } from 'react-icons/io'
import { RiServiceLine } from 'react-icons/ri'
import { CgMail } from 'react-icons/cg'

import { getAllCategories } from '@/services/database'

interface Category {
  id: string
  name: string
  slug: string
}

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([])
  const fetchCategories = useCallback(async () => {
    const categories = await getAllCategories()
    setCategories(categories.categories as Category[])
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <footer className="bg-[#121214] mt-10">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4">
        <div>
          <div className="grid grid-cols-2 gap-5 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-medium tracking-wide uppercase text-xl">
                Categorias
              </p>
              <ul className="mt-2 space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="transition-all duration-300 hover:text-green-400 ease-in-out"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium tracking-wide uppercase text-xl">
                Links
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/"
                    className="transition-all duration-300 hover:text-green-400 ease-in-out"
                  >
                    <FiHome className="inline-block mr-1" /> Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre"
                    className="transition-all duration-300 hover:text-green-400 ease-in-out"
                  >
                    <IoIosContact className="inline-block mr-1" /> Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="transition-all duration-300 hover:text-green-400 ease-in-out"
                  >
                    <FaBlog className="inline-block mr-1" /> Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium tracking-wide uppercase text-xl">
                Social
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    title="Ir para o meu perfil do Github"
                    href="https://github.com/EdilsonRogerioCuambe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:text-green-400 transition-all duration-300 ease-in-out"
                  >
                    <FaGithub className="inline-flex" /> Github
                  </a>
                </li>
                <li>
                  <a
                    title="Ir para o meu perfil do Linkedin"
                    href="https://www.linkedin.com/in/edilson-rog%C3%A9rio-cuambe-340140219/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:text-green-400 transition-all duration-300 ease-in-out"
                  >
                    <BsLinkedin className="inline-flex" /> Linkedin
                  </a>
                </li>
                <li>
                  <a
                    title="Enviar um email"
                    href="mailto:edilson@aluno.unilab.edu.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:text-green-400 transition-all duration-300 ease-in-out"
                  >
                    <CgMail className="inline-flex" /> Email
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <span className="text-xl font-bold tracking-wide uppercase">
                Edilson <span className="uppercase text-green-400">Cuambe</span>
              </span>
              <p className="mt-2 text-gray-400">
                Desenvolvedor FullStack Web e Mobile
              </p>
              <p className="mt-2 text-gray-400">
                © {new Date().getFullYear()} Edilson Cuambe. Todos os direitos
                reservados.
              </p>
              {/** News Letter */}
              <div className="mt-4">
                <form action="#" className="flex sm:max-w-sm sm:w-full">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Seu email"
                    className="flex-grow w-full h-10 px-4 transition duration-200 bg-[#121214] border border-gray-700 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                  />
                  <button
                    type="submit"
                    className="px-4 text-[#c4c4cc] py-2 ml-2 text-sm font-medium tracking-wider uppercase transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-500"
                  >
                    Assinar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
