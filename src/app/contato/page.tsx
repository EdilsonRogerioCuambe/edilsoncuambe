'use client'
import { useRef, useState } from 'react'
import Banner from '@/components/banner'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser'

export default function Contato() {
  const form = useRef<HTMLFormElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID &&
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
        form.current
      ) {
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
        )
        toast.success('Email enviado com sucesso!')
        setName('')
        setEmail('')
        setMessage('')
      }
    } catch (error) {
      console.log(error)
      toast.error('Erro ao enviar email!')
      setName('')
      setEmail('')
      setMessage('')
    }
  }

  return (
    <main>
      <Banner title="Contato" />
      <form
        ref={form}
        onSubmit={handleSubmit}
        method="POST"
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-[#c4c4cc] bg-[#121214] mt-16 rounded-md"
      >
        <label className="flex flex-col">
          Nome:
          <input
            type="text"
            value={name}
            name="from_name"
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-b-2 border-[#c4c4cc] focus:outline-none focus:border-b-green-400"
          />
        </label>
        <br />
        <label className="flex flex-col">
          Email:
          <input
            type="email"
            value={email}
            name="from_email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-b-2 border-[#c4c4cc] focus:outline-none focus:border-b-green-400"
          />
        </label>
        <br />
        <label className="flex flex-col">
          Mensagem:
          <textarea
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            className="bg-transparent border-2 p-2 border-[#c4c4cc] rounded-md focus:outline-none focus:border-b-green-400 resize-none h-32"
          />
        </label>
        <br />
        <button
          type="submit"
          disabled={!name || !email || !message}
          className={`bg-green-400 hover:bg-green-500 px-4 py-2 rounded-md text-white transition-all duration-300 ease-in-out ${
            !name || !email || !message ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Enviar
        </button>
      </form>
    </main>
  )
}
