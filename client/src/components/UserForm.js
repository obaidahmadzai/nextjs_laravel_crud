import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import axios from '@/lib/axios'
import CropEasy from './crop/CropEasy'
function UserForm() {
    const router = useRouter()
    const { id } = router.query
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profile, setProfile] = useState()
    const [fileHandle, setFileHandle] = useState()
    const [imageCroppedPopUp, setImageCroppedPopUp] = useState(false)
    const [errors, setErrors] = useState([])
    const inputFilePopUp = useRef()

    const getCroppedImage = croppedImageValue => {
        setProfile(croppedImageValue.file)
        setImageCroppedPopUp(false)
    }
    const getusers = async () => {
        axios
            .get(`/edituser/${id}`)
            .then(res => {
                setName(res.data.name)
                setEmail(res.data.email)
                setProfile(res.data.profile)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    useEffect(() => {
        getusers()
    }, [id])

    const handleChangeImage = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener('load', () => {
                setFileHandle(reader.result)
                setImageCroppedPopUp(true)
            })
        }
    }
    const update = async () => {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('profile', profile)
        {
            id && formData.append('id', id)
        }
        {
            id && formData.append('_method', 'PUT')
        }

        axios
            .post(`${id ? 'update' : 'create'}`, formData)
            .then(res => {
                alert(res.data.msg)
            })
            .catch(err => {
                setErrors(err.response.data.errors)
            })
    }

    const submitForm = event => {
        event.preventDefault()
        update()
    }
    return (
        <div className="container mx-auto">
            {fileHandle && imageCroppedPopUp && (
                <CropEasy
                    photoURL={fileHandle ? fileHandle : profile}
                    getCroppedImage={getCroppedImage}
                />
            )}
            <form onSubmit={submitForm} encType="multipart/form-data">
                <div className="grid grid-cols-12 flex-col gap-4 my-10">
                    {/* profile */}
                    <div className="col-span-12 flex flex-row items-center justify-center mx-auto ">
                        <div className="shrink-0">
                            <img
                                className="h-16 w-16 object-cover rounded-full hover:cursor-pointer"
                                src={
                                    fileHandle
                                        ? fileHandle
                                        : profile
                                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile}`
                                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/profile/profile.png`
                                }
                                alt="Current profile photo"
                                onClick={() => inputFilePopUp.current.click()}
                            />
                        </div>
                        <label className="block">
                            <span className="sr-only">
                                Choose profile photo
                            </span>
                            <input
                                type="file"
                                onChange={handleChangeImage}
                                className="hidden"
                                ref={inputFilePopUp}
                                accept="image/*"
                            />
                        </label>

                        <InputError
                            messages={errors.profile}
                            className="mt-2"
                        />
                    </div>

                    {/* Name */}
                    <div className="col-span-6 ">
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            required
                            onChange={event => setName(event.target.value)}
                            autoFocus
                        />

                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    {/* Email Address */}
                    <div className=" col-span-6">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className=" col-span-12">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            autoComplete="new-password"
                        />

                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end ">
                    <Button className="ml-4">{id ? 'Update ' : 'Save'}</Button>
                </div>
            </form>
        </div>
    )
}

export default UserForm
