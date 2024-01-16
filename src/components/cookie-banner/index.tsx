'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import { getLocalStorage, setLocalStorage } from '@/utils/storage.helper'

export default function CookieBanner() {
  const [isCookieAccepted, setIsCookieAccepted] = useState(false)

  useEffect(() => {
    const cookieAccepted = getLocalStorage('cookie_consent', null)
    setIsCookieAccepted(cookieAccepted)
  }, [setIsCookieAccepted])

  useEffect(() => {
    const newValue = isCookieAccepted ? 'granted' : 'denied'

    window.gtag('consent', 'update', {
      analytics_storage: newValue,
    })

    setLocalStorage('cookie_consent', isCookieAccepted)

    console.log('Cookie consent updated', isCookieAccepted)
  }, [isCookieAccepted])

  return (
    <div
      className={`my-10 mx-4 md:mx-auto py-4 max-w-max md:max-w-5xl fixed bottom-0 left-0 right-0 ${
        isCookieAccepted ? 'hidden' : 'flex'
      } flex px-3 md:px-4 justify-between items-center flex-col sm:flex-row gap-4 bg-[#323238] rounded-lg shadow text-[#c4c4cc]`}
    >
      <div className="text-center">
        <Link href="/politica-de-privacidade">
          <p>
            Nos usamos <span className="font-bold text-green-400">cookies</span>{' '}
            em nosso site para melhorar a sua experiência.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsCookieAccepted(false)}
          title="Negar cookies"
          className="px-5 py-2 text-[#c4c4cc] rounded-md border-purple-500 border-2"
        >
          Negar
        </button>
        <button
          type="button"
          onClick={() => setIsCookieAccepted(true)}
          title="Aceitar cookies"
          className="px-5 py-2 text-[#c4c4cc] rounded-md border-purple-500 bg-[#121214] border-2"
        >
          Aceitar cookies 🍪
        </button>
      </div>
    </div>
  )
}
