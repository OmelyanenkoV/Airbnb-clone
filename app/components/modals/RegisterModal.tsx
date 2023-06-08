'use client'
import React, {useState} from 'react';
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useRegisterModal from "@/app/components/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import {signIn} from "next-auth/react";


const RegisterModal = () => {
    const registerModel = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data)
            .then(() => {
                registerModel.onClose()
            })
            .catch(() => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    const bodyContent = (
        <div className={`flex flex-col gap-4`}>
            <Heading
                title={`Welcome to Airbnb`}
                subtitle={`Create an account!`}
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
                id={`name`}
                label={`Name`}
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
                onClick={() => signIn('google')}
            />
            <Button
                outline
                icon={AiFillGithub}
                label={`Continue with GitHub`}
                onClick={() => signIn('github')}
            />
            <div className={`text-neutral-500 text-center mt-4 font-light`}>
                <div className={`flex flex-row gap-2 justify-center`}>
                    <div>
                        <p>
                            Already have an account?
                        </p>
                    </div>
                    <div onClick={registerModel.onClose}>
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
            isOpen={registerModel.isOpen}
            title={`Register`}
            actionLabel={`Continue`}
            onClose={registerModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;