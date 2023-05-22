import Image from 'next/image'
import nlwLogo from '../assets/nlw-spacetime-logo.svg'
import Link from 'next/link'
export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={nlwLogo} alt="NLW Spacetime" />

      <div className="max-w-[402px] space-y-1">
        <h1 className="mt-5 text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momenentos marcantes da sua jornada e compartilhe ( se
          quiser) com o mundo!
        </p>
      </div>
      <Link
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black"
        href="/memories/new"
      >
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  )
}
