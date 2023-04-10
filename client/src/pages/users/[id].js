import UserForm from '@/components/UserForm'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
function EditUser() {
    return (
        <div>
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Update User
                    </h2>
                }>
                <Head>
                    <title> Edit User</title>
                </Head>
                <UserForm />
            </AppLayout>
        </div>
    )
}

export default EditUser
