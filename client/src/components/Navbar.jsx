import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <header className="flex justify-between p-4 bg-white shadow">
      <h1 className="text-xl font-bold">Clean Nairobi</h1>
      <div>
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

