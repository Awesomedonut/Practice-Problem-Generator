import Link from 'next/link';

export default function Header() {
    return (
        <div>
        <Link href="/">home</Link>
        <Link href="/About">About</Link>
        <Link href="/Team">Team</Link>
      </div>
    )
}