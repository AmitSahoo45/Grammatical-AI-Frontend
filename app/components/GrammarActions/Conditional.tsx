'use client';

import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { debounce } from 'lodash';
import dynamic from 'next/dynamic';

const Container = dynamic(() => import('@/app/components/Container'), { ssr: false });
const ResponseBox = dynamic(() => import('@/app/components/GrammarActions/ResponseBox'), { ssr: false })

import { ConditionalSentences } from '@/app/action/prompt';
import { CheckString, parseResponse } from '@/app/libs/checks';

const Conditional = () => {
    const [text, setText] = useState('');
    const [action, setAction] = useState('check');
    const [result, setResult] = useState<string>('');
    const [explaination, setExplaination] = useState<string>('');

    const [gotResponse, setGotResponse] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleConditional = useCallback(
        debounce(async (text, action) => {
            try {
                setIsLoading(true);
                CheckString(text);
                const actionText = action === 'check' 
                    ? 'Analyze the conditional sentence, identify its type, and correct if necessary' 
                    : action === 'convert' 
                    ? 'Convert the sentence to a conditional form if it is not already one'
                    : 'Analyze and explain the conditional sentence structure';
                
                const response = await ConditionalSentences({ text, action: actionText });
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
            <h3 className='mt-3 text-lg '>Conditional Sentences</h3>
            <p className='text-sm my-3'>Enter your sentence below to work with conditional forms</p>

            <input
                className='w-full p-2 border border-gray-300 rounded-lg'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your sentence"
                spellCheck={true}
                autoComplete='off'
                required
            />

            <div className='flex gap-2 my-3'>
                <label className='flex items-center gap-1 text-sm'>
                    <input 
                        type="radio" 
                        value="check" 
                        checked={action === 'check'}
                        onChange={(e) => setAction(e.target.value)}
                    />
                    Check & Correct
                </label>
                <label className='flex items-center gap-1 text-sm'>
                    <input 
                        type="radio" 
                        value="convert" 
                        checked={action === 'convert'}
                        onChange={(e) => setAction(e.target.value)}
                    />
                    Convert to Conditional
                </label>
                <label className='flex items-center gap-1 text-sm'>
                    <input 
                        type="radio" 
                        value="explain" 
                        checked={action === 'explain'}
                        onChange={(e) => setAction(e.target.value)}
                    />
                    Explain
                </label>
            </div>

            <button
                className='py-2 px-4 bg-theme-pink text-white rounded text-sm font-medium hover:bg-theme-pink-600 transition-all duration-300 hover:cursor-pointer ease-out disabled:opacity-50 disabled:cursor-not-allowed mb-4'
                disabled={isLoading}
                onClick={() => handleConditional(text, action)}
            >
                {isLoading ? 'Loading...' : 'Process Sentence'}
            </button>

            {gotResponse && <ResponseBox result={result} explaination={explaination} />}
        </Container>
    )
}

export default Conditional