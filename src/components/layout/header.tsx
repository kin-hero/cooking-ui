// src/components/layout/header.tsx
import { cookies } from "next/headers";
import Link from "next/link";

export async function Header() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("recipe_token_user");
  const isLoggedIn = !!userToken;

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Recipify
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Link href="/create/recipe" className="bg-[#FF9119] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#FF7A00]">
              Create Recipe
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
                Login
              </Link>
              <Link href="/auth/register" className="bg-[#FF9119] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#FF7A00]">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
