'use client';

import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { debounce } from 'lodash';
import dynamic from 'next/dynamic';

const Container = dynamic(() => import('@/app/components/Container'), { ssr: false });
const ResponseBox = dynamic(() => import('@/app/components/GrammarActions/ResponseBox'), { ssr: false })

import { DirectAndIndirect } from '@/app/action/prompt';
import { CheckString, parseResponse } from '@/app/libs/checks';

const DirectIndirect = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState<string>('');
    const [explaination, setExplaination] = useState<string>('');

    const [gotResponse, setGotResponse] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDirectIndirect = useCallback(
        debounce(async (text) => {
            try {
                setIsLoading(true);
                CheckString(text);
                const response = await DirectAndIndirect({ text, action: `Convert the following speech` });
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
        <Container>
            <h3 className='mt-3 text-lg '>Direct and Indirect Speech</h3>
            <p className='text-sm my-3'>Paste the phrase below</p>

            <input
                className='w-full p-2 border border-gray-300 rounded-lg'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your sentence"
                spellCheck={true}
                autoComplete='off'
                required
            />

            <button
                className='py-2 px-4 bg-theme-pink text-white rounded text-sm font-medium hover:bg-theme-pink-600 transition-all duration-300 hover:cursor-pointer ease-out disabled:opacity-50 disabled:cursor-not-allowed mt-3 mb-4'
                disabled={isLoading}
                onClick={() => handleDirectIndirect(text)}
            >
                {isLoading ? 'Loading...' : 'Convert Speech'}
            </button>

            {gotResponse && <ResponseBox result={result} explaination={explaination} />}
        </Container>
    )
}

export default DirectIndirect