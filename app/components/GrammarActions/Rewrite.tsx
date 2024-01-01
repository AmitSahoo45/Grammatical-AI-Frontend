'use client';

import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { debounce } from 'lodash';
import dynamic from 'next/dynamic';

const Container = dynamic(() => import('@/app/components/Container'), { ssr: false });
const ResponseBox = dynamic(() => import('@/app/components/GrammarActions/ResponseBox'), { ssr: false })

import { RewriteSentences } from '@/app/action/prompt';
import { CheckString, parseResponse } from '@/app/libs/checks';

const Rewrite = () => {
    const [phrase, setPhrase] = useState<string>('');
    const [rewriteCond, setRewriteCond] = useState<string>('');

    const [action, setAction] = useState<string>(``);
    const [result, setResult] = useState<string>('');
    const [explaination, setExplaination] = useState<string>('');

    const [gotResponse, setGotResponse] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const rewriteSentence = useCallback(
        debounce(async (text, action) => {
            try {
                setIsLoading(true);
                CheckString(text);

                if (!action)
                    throw new Error('Where rewrite condition?🤔');

                const response = await RewriteSentences({ text, action })
                const { output, explaination: explain } = parseResponse(response);
                setResult(output);
                setExplaination(explain);
                setIsLoading(false);
                setGotResponse(true);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }, 3000, {
            leading: true,
            trailing: false
        }), []
    )

    return (
        <Container classes='flex flex-col items-center'>

            <>
                <p className='text-center text-sm mt-4'>
                    For eg. :
                    <span className='text-red-700'>
                        The librarian orders books for the school library every year.
                    </span>
                </p>
                <input
                    className='w-full p-2 border border-gray-300 rounded-lg mt-2'
                    value={phrase}
                    onChange={(e) => setPhrase(e.target.value)}
                    placeholder="Enter your phrase"
                    spellCheck={false}
                    required
                />
            </>

            <>
                <p className='text-center text-sm mt-4'>
                    For eg. :
                    <span className='text-red-700'>
                        Begin with they
                    </span>
                </p>
                <input
                    className='w-full p-2 border border-gray-300 rounded-lg mt-2'
                    value={rewriteCond}
                    onChange={(e) => setRewriteCond(e.target.value)}
                    placeholder="Enter your rewrite condition"
                    spellCheck={false}
                    required
                />
            </>

            <button
                className='py-2 px-4 my-3 bg-theme-pink text-white rounded text-sm font-medium hover:bg-theme-pink-600 transition-all duration-300 hover:cursor-pointer ease-out disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isLoading}
                onClick={() => rewriteSentence(phrase, rewriteCond)}
            >
                {isLoading ? 'Loading...' : 'Rewrite'}
            </button>

            {gotResponse && <ResponseBox result={result} explaination={explaination} />}
        </Container>
    )
}

export default Rewrite