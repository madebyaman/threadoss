import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="bg-red-100">Hello</div>
      <Link href="/app/articles">Articles</Link>
      <Link href="/api/auth">Login</Link>
    </>
  );
}
