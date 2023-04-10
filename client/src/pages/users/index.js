import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'
import Link from 'next/link'
import Button from '@/components/Button'
import NavLink from '@/components/NavLink'

function Users() {
    const [users, setUsers] = useState()
    const getusers = async () => {
        axios
            .get('/getuser')
            .then(res => setUsers(res.data))
            .catch(err => {
                alert(err.response.data)
            })
    }
    useEffect(() => {
        getusers()
    }, [])
    const onDelete = item => {
        axios
            .get(`/delete/${item.id}`)
            .then(res => {
                alert(res.data.msg)
                getusers()
            })
            .catch(err => {
                alert(err.response.data.msg)
            })
    }

    return (
        // Applayout
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }>
            <Head>
                <title> Users</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Link
                                href="/users/create"
                                className=" bg-slate-600 text-white rounded-lg p-2 hover:bg-slate-400">
                                ADD NEW
                            </Link>
                            <div className="flex flex-col overflow-x-auto">
                                <div className="sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full text-left text-sm font-light">
                                                <thead className="border-b font-medium dark:border-neutral-500">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4">
                                                            #
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4">
                                                            Profile
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4">
                                                            Name
                                                        </th>

                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4">
                                                            Email
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users &&
                                                        users.map(
                                                            (item, index) => (
                                                                <tr
                                                                    key={index}
                                                                    className="border-b dark:border-neutral-500">
                                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                        {index +
                                                                            1}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-6 py-4">
                                                                        <div className="shrink-0">
                                                                            <img
                                                                                className="h-16 w-16 object-cover rounded-full"
                                                                                src={
                                                                                    item.profile
                                                                                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.profile}`
                                                                                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile.png`
                                                                                }
                                                                                alt="Current profile photo"
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-6 py-4">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-6 py-4">
                                                                        {
                                                                            item.email
                                                                        }
                                                                    </td>

                                                                    <td className="whitespace-nowrap px-6 py-4 flex gap-2 ">
                                                                        <Link
                                                                            href={`/users/${item.id}`}>
                                                                            <MdModeEditOutline
                                                                                size={
                                                                                    25
                                                                                }
                                                                                className="hover:cursor-pointer"
                                                                            />
                                                                        </Link>
                                                                        <MdDeleteOutline
                                                                            size={
                                                                                25
                                                                            }
                                                                            onClick={() =>
                                                                                onDelete(
                                                                                    item,
                                                                                )
                                                                            }
                                                                            className="hover:cursor-pointer"
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ),
                                                        )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default Users
