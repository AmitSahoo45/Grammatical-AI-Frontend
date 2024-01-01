'use client';

import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { debounce } from 'lodash';
import dynamic from 'next/dynamic';

import { IoMdSwap } from "react-icons/io";

const Container = dynamic(() => import('@/app/components/Container'), { ssr: false });
import englishGrammar from '@/app/action/prompt';
import { CheckString, parseResponse } from '@/app/libs/checks';

const ActivePassiveComponent = () => {
    const [isActiveVoice, setIsActiveVoice] = useState<boolean>(true)

    const [text, setText] = useState<string>('');
    const [action, setAction] = useState<string>('Convert Active Voice to Passive Voice');
    const [result, setResult] = useState<string>('');
    const [explaination, setExplaination] = useState<string>('Explaination will appear here.');

    const [gotResponse, setGotResponse] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function changeVoice() {
        setIsActiveVoice(!isActiveVoice)
        setAction('Convert ' + (isActiveVoice ? 'Active' : 'Passive') + ' Voice to ' + (isActiveVoice ? 'Passive' : 'Active') + ' Voice');
    }

    const handleActivePassive = useCallback(
        debounce(async (text, action) => {
            try {
                setIsLoading(true);
                CheckString(text);
                const response = await englishGrammar({ text, action })
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

            <div className='flex items-center justify-center gap-2 mb-4'>
                <p>Change from {isActiveVoice ? 'active' : 'passive'} voice to {isActiveVoice ? 'passive' : 'active'} voice.</p>
                <IoMdSwap
                    className='text-3xl p-1 rounded-full bg-theme-pink cursor-pointer'
                    onClick={() => changeVoice()}
                />
            </div>

            <input
                type="text"
                value={text}
                autoComplete='off'
                required
                spellCheck={false}
                minLength={3}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
                className='p-2 border-2 border-theme-pink rounded w-full mb-6'
            />

            {gotResponse
                &&
                <>
                    <p className='pt-2 border-t-2 border-t-theme-pink w-full mb-4'>
                        {isActiveVoice ? 'Active' : 'Passive'} Form:&nbsp;
                        <span className='font-semibold'>
                            {result}
                        </span>
                    </p>

                    <p className='text-sm mb-6'>
                        {explaination}
                        <br />
                        <p className="text-[0.6rem] text-center text-red-700 mt-2 font-bold leading-3">
                            Didn&apos;t like the response? Try again by regenerating the response.
                        </p>
                    </p>
                </>
            }

            <button
                className='py-2 px-4 bg-theme-pink text-white rounded text-sm font-medium hover:bg-theme-pink-600 transition-all duration-300 hover:cursor-pointer ease-out disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isLoading}
                onClick={() => handleActivePassive(text, action)}
            >
                {isLoading ? 'Loading...' : 'Change Voice'}
            </button>
        </Container>
    )
}

export default ActivePassiveComponent