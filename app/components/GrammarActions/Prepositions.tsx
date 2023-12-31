'use client';

import { useState } from 'react'
import dynamic from 'next/dynamic';

import englishGrammar from '@/app/action/prompt';
const Container = dynamic(() => import('@/app/components/Container'), { ssr: false });
import { CheckString, parseResponse } from '@/app/libs/checks';

const Prepositions = () => {
    const [userInput, setUserInput] = useState('');

    return (
        <Container classes='flex flex-col items-center'>
            <p className='text-center'>
                Fill in the blanks in the following format. <br />
                <span className="text-[0.6rem] text-center text-red-700 mt-2 font-bold leading-3">
                    He is junior --- me.
                </span> <br />
                The <span className='font-extrabold text-slate-400'>---</span> represent a blank space.
            </p>

            <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded-lg mt-4 resize-none"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your phrase"
                spellCheck={false}
                required
            />
        </Container>
    )
}

export default Prepositions