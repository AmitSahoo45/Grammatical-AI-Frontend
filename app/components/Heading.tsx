'use client';

import Image from 'next/image';
import React from 'react'
import Container from './Container';

const Heading = () => {
    return (
        <Container>
            <div className='flex mb-5 pt-10 sm:flex-row flex-col'>
                <header className="flex-1 flex flex-col ">
                    <div className='leading-8 text-center sm:text-left'>
                        <h1 className='font-bold text-4xl gradient-1-text'>Grammatical AI</h1>
                        <p className='mt-1 font-medium sm:ml-6 ml-0'>Your Ultimate AI Grammar Assistant.</p>
                    </div>
                    <p className='py-4 pl-0 sm:px-4 px-0 text-center sm:text-start w-full text-slate-700'>
                        Say Goodbye to Grammar Woes. Say Hello to Grammar Success.
                        Let Grammatical AI take care of your grammar needs. <br />
                    </p>
                </header>

                <div className='flex-1 relative hidden sm:block'>
                    <Image
                        src="/exams.svg"
                        alt="hero"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        quality={100}
                        style={{ objectFit: "fill" }}
                        loader={() => "/exams.svg"}
                    />
                </div>
            </div>
        </Container>
    )
}

export default Heading