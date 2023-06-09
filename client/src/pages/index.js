import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })
    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>

            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="ml-4 text-sm dark:text-white text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm dark:text-white text-gray-700 underline">
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="ml-4 text-sm dark:text-white text-gray-700 underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
