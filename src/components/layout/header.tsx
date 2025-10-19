import Link from "next/link";

export function Header() {
  return (
    <header>
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          Recipify
        </Link>
        <div className="flex gap-4 text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 rounded-lg text-sm px-5 py-2.5 text-center items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 font-bold">
          <Link href="/create/recipe">Create Recipe</Link>
        </div>
      </nav>
    </header>
  );
}
