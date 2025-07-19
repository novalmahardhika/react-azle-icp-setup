import { createContext, useEffect, useState, type ReactNode } from "react"
import { canisterId, createActor } from "@declarations/backend"
import { AuthClient } from "@dfinity/auth-client"
import { ANONYMOUS_PRINCIPAL, IDENTITY_PROVIDER } from "../constants"

import type { _SERVICE } from "@declarations/backend/backend.did"
import type { ActorSubclass } from "@dfinity/agent"
import type { Principal } from "@dfinity/principal"

type AuthContextType = {
  actor: ActorSubclass<_SERVICE> | null
  authClient: AuthClient | null
  isAuthenticated: boolean
  principal: Principal | null
  login: () => void
  logout: () => void
}

type StateType = Omit<AuthContextType, 'login' | 'logout'>

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StateType>({
    actor: null,
    authClient: null,
    isAuthenticated: false,
    principal: null
  })

  useEffect(() => {
    updateActor();
  }, []);


  const updateActor = async () => {
    const authClient = await AuthClient.create()
    const identity = authClient.getIdentity()
    const actor = createActor(canisterId, {
      agentOptions: {
        identity
      }
    })

    const isAuthenticated = await authClient.isAuthenticated()

    const getPrincipal = identity.getPrincipal()
    const isPrincipalAnonymous = getPrincipal.toText() === ANONYMOUS_PRINCIPAL
    const principal = !isPrincipalAnonymous ? getPrincipal : null

    setState((prev) => ({
      ...prev,
      actor,
      authClient,
      isAuthenticated,
      principal
    }))
  }

  const login = async () => {
    if (!state.authClient) return
    await state.authClient.login({
      identityProvider: IDENTITY_PROVIDER,
      onSuccess: updateActor
    })
  }

  const logout = async () => {
    if (!state.authClient) return
    await state.authClient.logout()
    updateActor()
  }

  const values: AuthContextType = {
    login,
    logout,
    actor: state.actor,
    authClient: state.authClient,
    isAuthenticated: state.isAuthenticated,
    principal: state.principal,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}