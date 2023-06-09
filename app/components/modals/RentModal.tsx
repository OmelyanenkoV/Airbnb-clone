'use client'
import React, {useMemo, useState} from 'react';
import Modal from "@/app/components/modals/Modal";
import useRentModal from "@/app/components/hooks/useRentModal";
import Heading from "@/app/components/Heading";
import {categories} from "@/app/components/navbar/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import {FieldValues, useForm} from "react-hook-form";
import CountrySelect from "@/app/components/inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "@/app/components/inputs/Counter";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal: React.FC = () => {

    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }
    const onNext = () => {
        setStep((value) => value + 1)
    }


    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) return 'Create'
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) return undefined
        return 'Back'
    }, [step])

    let bodyContent = (
        <div className={`flex flex-col gap-8`}>
            <Heading
                title={`Which of these best describes your place?`}
                subtitle={`Pick a category`}
            />
            <div className={`
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                `}
            >
                { categories.map((item) => (
                    <div
                        className={`col-span-1`}
                        key={item.label}
                    >
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}

            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div
                className={`flex flex-col gap-8`}
            >
                <Heading
                    title={`Where is your place located`}
                    subtitle={`Help guests find you`}
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue(`location`, value)}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className={`flex flex-col gap-8`}>
                <Heading
                    title={`Share some basics about your place`}
                    subtitle={`What amenities do you have?`}
                />
               <Counter
                    title={`Guests`}
                    subtitle={`How many guests do you allow?`}
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
               />
                <hr/>
                <Counter
                    title={`Rooms`}
                    subtitle={`How many rooms do you have?`}
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr/>
                <Counter
                    title={`Bathrooms`}
                    subtitle={`How many Bathrooms do you have?`}
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    return (
        <>
            <div>
                <Modal
                    title={`Airbnb your home!`}
                    isOpen={rentModal.isOpen}
                    actionLabel={actionLabel}
                    secondaryActionLabel={secondaryActionLabel}
                    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
                    disabled={false}
                    body={bodyContent}
                    onClose={rentModal.onClose}
                    onSubmit={onNext}
                />
            </div>
        </>

    );
};

export default RentModal;