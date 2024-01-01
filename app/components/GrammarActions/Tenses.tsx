'use client';

import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { debounce } from 'lodash';
import dynamic from 'next/dynamic';

const Container = dynamic(() => import('@/app/components/Container'), { ssr: false });
const ResponseBox = dynamic(() => import('@/app/components/GrammarActions/ResponseBox'), { ssr: false })
import { FillinTenses } from '@/app/action/prompt';
import { CheckString, parseResponse } from '@/app/libs/checks';

const Tenses = () => {
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState<string>('');
    const [explaination, setExplaination] = useState<string>('');

    const [gotResponse, setGotResponse] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleTenses = useCallback(
        debounce(async (text) => {
            try {
                setIsLoading(true);
                CheckString(text);
                const response = await FillinTenses({ text, action: "Fill in the blanks with appropriate prepositions" });
                const { output, explaination: explain } = parseResponse(response);
                setResult(output);
                setExplaination(explain);
                setIsLoading(false);
                setGotResponse(true);
            } catch (error: any) {
                console.error(error);
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }, 3000, {
            leading: true,
            trailing: false
        }), []
    );

    return (
        <Container classes='flex flex-col items-center'>
            <h3 className='mt-3 text-lg '>Tenses - Paste the passage below</h3>

            <textarea
                className='w-full h-40 p-2 border border-gray-300 rounded-lg mt-4 resize-none'
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your phrase"
                spellCheck={false}
                required
            />

            <button
                className='py-2 px-4 my-3 bg-theme-pink text-white rounded text-sm font-medium hover:bg-theme-pink-600 transition-all duration-300 hover:cursor-pointer ease-out disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isLoading}
                onClick={() => handleTenses(userInput)}
            >
                {isLoading ? 'Loading...' : 'Fill in the tenses'}
            </button>

            {gotResponse && <ResponseBox result={result} explaination={explaination} />}
        </Container>
    )
}

export default Tenses