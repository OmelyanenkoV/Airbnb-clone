'use client'
import React, {useCallback} from 'react';
import {IconType} from "react-icons";
import {useRouter, useSearchParams} from "next/navigation";
import qs from 'query-string'

interface CategoryBoxProps {
    label: string
    selected?: boolean
    description?: string
    icon: IconType
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    selected,
    description,
    icon: Icon
}) => {
    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(() => {
        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull : true})

        router.push(url)
    }, [label, params, router])

    return (
        <div
            className={`
             flex
             flex-col
             items-center
             justify-center
             gap-2
             p-3
             border-b-2
             hover:text-rose-500
             transition
             cursor-pointer
             ${selected ? 'border-b-neutral-800' : 'border-transparent'}
             ${selected ? 'text-rose-500' : 'text-neutral-500'}
        `}
            onClick={handleClick}
            title={description}
        >
            <Icon size={26} />
            <div className={`font-medium text-sm`}>
                <p>{ label }</p>
            </div>
        </div>
    );
};

export default CategoryBox;