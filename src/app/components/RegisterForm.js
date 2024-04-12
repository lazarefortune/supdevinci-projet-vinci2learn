"use client"

import { useState } from 'react'
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleRegister = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        const data = await response.json()

        if (data.error) {
            setError(data.message)
        } else {
            router.push('/connexion')
        }

        setLoading(false)
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="text-4xl font-bold mb-4">Inscription</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleRegister} className="flex flex-col justify-between gap-6">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="name"
                            id="name"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                            <span>Rejoindre 🚀</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
