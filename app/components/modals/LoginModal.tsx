'use client'
import React, {useEffect, useState} from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/components/hooks/useLoginModal";
import useRegisterModal from "@/app/components/hooks/useRegisterModal";
import { useRouter } from "next/navigation";


const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [isLoading, setIsLoading] = useState(false)


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {...data, redirect: false})
            .then((callback) => {
                setIsLoading(false)
                if (callback?.ok) {
                    toast.success('Successfully logged in')
                    router.refresh()
                    loginModal.onClose()
                } else if (callback?.error) {
                    toast.error(callback.error)
                }
            })
    }

    const bodyContent = (
        <div className={`flex flex-col gap-4`}>
            <Heading
                title={`Welcome to back`}
                subtitle={`Login to your account!`}
            />
            <Input
                id={`email`}
                label={`Email`}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id={`password`}
                type={`password`}
                label={`Password`}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className={`flex flex-col gap-4 mt-3`}>
            <hr/>
            <Button
                outline
                icon={FcGoogle}
                label={`Continue with Google`}
                onClick={() => {}}
            />
            <Button
                outline
                icon={AiFillGithub}
                label={`Continue with GitHub`}
                onClick={() => {}}
            />
            <div className={`text-neutral-500 text-center mt-4 font-light`}>
                <div className={`flex flex-row gap-2 justify-center`}>
                    <div>
                        <p>
                            Already have an account?
                        </p>
                    </div>
                    <div onClick={loginModal.onClose}>
                        <p className={`text-neutral-800 cursor-pointer hover:underline`}>
                            Log in
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title={`Login`}
            actionLabel={`Continue`}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;