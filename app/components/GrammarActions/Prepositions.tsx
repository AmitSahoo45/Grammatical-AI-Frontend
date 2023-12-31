'use client';

import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';

import englishGrammar from '@/app/action/prompt';
const Container = dynamic(() => import('@/app/components/Container'), { ssr: false });
import { CheckString, parseResponse } from '@/app/libs/checks';

const Prepositions = () => {
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState<string>('');
    const [explaination, setExplaination] = useState<string>('Explaination will appear here.');

    const [gotResponse, setGotResponse] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePrepositions = useCallback(
        debounce(async (text) => {
            try {
                setIsLoading(true);
                CheckString(text);
                const response = await englishGrammar({ text, action: "Fill in the blanks with appropriate prepositions" });
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
    );

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

            <button
                className='py-2 px-4 mt-4 mb-3 bg-theme-pink text-white rounded text-sm font-medium hover:bg-theme-pink-600 transition-all duration-300 hover:cursor-pointer ease-out disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={() => handlePrepositions(userInput)}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Give me prepositions!'}
            </button>

            {gotResponse
                &&
                <>
                    <p className='pt-2 border-t-2 border-t-theme-pink w-full mb-4'>
                        {result}
                    </p>

                    <p className='text-sm mb-6'>
                        {explaination}
                        <br />
                        <span className="text-[0.6rem] text-center text-red-700 mt-2 font-bold leading-3">
                            Didn&apos;t like the response? Try again by regenerating the response.
                        </span>
                    </p>

                </>
            }
        </Container>
    )
}

export default Prepositions