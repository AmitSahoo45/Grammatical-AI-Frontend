'use client';

import React, { useContext } from 'react'
import Container from './Container';
import Image from 'next/image';
import Typewriter from "typewriter-effect";
import { FaTimes } from 'react-icons/fa'

import { ActionType } from '@/app/types'
import { AppContext } from '../context/context';
import FeatureAction from './FeatureAction';

const Features: React.FC = () => {
    const { grammarAction, setGrammarAction } = useContext(AppContext);
    const actionTypesArray: [string, string][] = Object.entries(ActionType);

    const resetGrammarAction = () => setGrammarAction({ type: '' })

    return (
        <Container>
            <main className='flex my-4 flex-col sm:flex-row'>
                <section className='flex-[0.3] flex flex-col items-center justify-center mb-4'>
                    <Image
                        src='/missjanice.png'
                        alt='Miss Janice'
                        width={150}
                        height={300}
                        className="object-contain"
                        quality={100}
                        style={{ objectFit: "fill" }}
                        loader={() => "/missjanice.png"}
                        priority={true}
                    />

                    <div className='text-gray-600 mt-4 font-medium'>
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString("Hi, I'm Miss Janice.")
                                    .pauseFor(2000)
                                    .deleteAll()
                                    .typeString("How can I help you with?")
                                    .pauseFor(1500)
                                    .deleteAll()
                                    .start();
                            }}
                            options={{ loop: true, autoStart: true }}
                        />
                    </div>
                </section>

                <main className='flex-[0.7]'>
                    {grammarAction.type === '' &&
                        <section className=''>
                            <h3 className='font-medium text-lg text-center sm:text-left mb-4'>Choose on what topic you need my help</h3>
                            <div>
                                <ol type='A'>
                                    {actionTypesArray.map(([key, value], index) => (
                                        <li
                                            key={index}
                                            className='p-2 bg-slate-100 border-2 mb-1 cursor-pointer rounded-lg text-sm text-center'
                                            onClick={() => setGrammarAction({ type: key as ActionType })}
                                        >
                                            {value}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </section>
                    }

                    {grammarAction.type !== '' &&
                        <div className='relative'>
                            <FaTimes
                                className='absolute top-0 right-0 cursor-pointer'
                                onClick={resetGrammarAction}
                            />
                            <FeatureAction type={grammarAction} />
                        </div>
                    }
                </main>
            </main>
        </Container>
    )
}

export default Features