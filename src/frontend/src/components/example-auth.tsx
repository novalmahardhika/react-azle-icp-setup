import { useAuth } from "@/lib/hooks/use-auth"
import { Button } from "./ui/button"

export function ExampleAuth() {
  const { isAuthenticated, principal, login, logout } = useAuth()

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="max-w-lg w-full p-3 border border-gray-300 rounded flex flex-col justify-center items-center space-y-2">
        <h1 className="font-bold text-lg">Azle + React + Internet Identity</h1>
        <div className="text-center font-medium grid gap-1">
          <h2>Your principal ID is:</h2>
          <h4>{principal ? principal.toText() : "Principal Id is empty"}</h4>
        </div>

        {!isAuthenticated ? (
          <Button onClick={login}>Login with Internet Identity</Button>
        ) : (
          <Button variant={'destructive'} onClick={logout}>Logout</Button>
        )}
      </div>
    </section>
  )
}
