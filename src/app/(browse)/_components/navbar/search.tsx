"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import qs from 'query-string';
import Form from 'next/form'


export const Search = () => {
    const [value, setValue] = useState("")
    const router = useRouter()

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!value || value.trim.length <= 0) return

        const url = qs.stringifyUrl({
            url: "/",
            query: { term:value },
        }, {skipEmptyString: true, skipNull:true});

        console.log(url);
        


        router.push(url)
    }

    return (
        <Form className='flex w-full items-center max-w-lg' action="/search">
            <Input placeholder='Search' name="query" className='rounded-r-none focus-visible:ring-offset-0'/>
            <Button className='rounded-l-none' type='submit' size="sm" variant="ghost">
                <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="28" height="28" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" data-a-selector="tw-core-button-icon"><g fill="#EFEFF1"><path fillRule="evenodd" d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z" clipRule="evenodd" fill="#EFEFF1"></path></g></svg>
            </Button>
        </Form>
    )
}





// "use client"

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { useRouter } from 'next/navigation'
// import React, { useState } from 'react'
// import qs from 'query-string';

// export const Search = () => {
//     const [value, setValue] = useState("")
//     const router = useRouter()

//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if(!value || value.trim.length <= 0) return

//         const url = qs.stringifyUrl({
//             url: "/",
//             query: { term:value },
//         }, {skipEmptyString: true, skipNull:true});

//         console.log(url);
        


//         router.push(url)
//     }

//     return (
//         <form className='flex w-full items-center max-w-lg' onSubmit={onSubmit}>
//             <Input placeholder='Search' value={value} className='rounded-r-none focus-visible:ring-offset-0' onChange={(event) => {setValue(event.target.value)}}/>
//             <Button className='rounded-l-none' type='submit'>
//                 <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="24" height="24" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" data-a-selector="tw-core-button-icon"><g fill="#EFEFF1"><path fillRule="evenodd" d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z" clipRule="evenodd" fill="#EFEFF1"></path></g></svg>
//             </Button>
//         </form>
//     )
// }

