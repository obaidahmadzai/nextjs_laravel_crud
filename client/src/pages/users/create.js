import UserForm from '@/components/UserForm'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
function CreateUser() {
    return (
        <div>
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create User
                    </h2>
                }>
                <Head>
                    <title> Create User</title>
                </Head>
                <UserForm />
            </AppLayout>
        </div>
    )
}

export default CreateUser
