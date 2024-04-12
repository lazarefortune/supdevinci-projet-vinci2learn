"use client"

import { useState } from 'react'
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react";

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (res.error) {
                if (res.error === 'CredentialsSignin') {
                    setError('Email ou mot de passe incorrect')
                } else {
                    setError(res.error)
                }
            } else {
                router.push('/')
            }
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-3 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg border border-slate-200 p-3 lg:p-8 rounded-md">
                <h1 className="text-4xl font-bold mb-4">Connexion</h1>
                <p className="text-slate-500 mb-4">Connectez-vous à votre compte VINCI2LEARN</p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-6">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <div className='flex flex-row'>
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 border-b border-slate-100 rounded-full"
                                    viewBox="0 0 24 24"
                                ></svg>
                                <span>loading...</span>
                            </div>
                        ) : (
                            <span>Connexion 🚀</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
