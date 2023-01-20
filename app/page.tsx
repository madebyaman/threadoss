import Link from 'next/link';

export default async function Home() {
  return (
    <>
      <Link className="block" href="/app/articles">
        Articles
      </Link>
      <Link href="/api/auth">Login</Link>
    </>
  );
}
