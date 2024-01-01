import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';

import englishGrammar from '@/app/action/prompt';
const Container = dynamic(() => import('@/app/components/Container'), { ssr: false });
import { CheckString, parseResponse } from '@/app/libs/checks';

const Adjectives = () => {
    const [text, setText] = useState('');
    const [to, setTo] = useState<string>('Positive');

    const [action, setAction] = useState<string>(`Adjectives: Change to ${to} Degree`);
    const [result, setResult] = useState<string>('');
    const [explaination, setExplaination] = useState<string>('Explaination will appear here.');

    const [gotResponse, setGotResponse] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function changeDegree(to: string) {
        setTo(to);
        setAction(`Adjectives: Change to ${to} Degree`);
    }

    const handleAdjectives = useCallback(
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
            <div>
                Change to
                <select
                    className='ml-2 border border-gray-300 rounded-lg p-1'
                    value={to}
                    onChange={(e) => changeDegree(e.target.value)}
                >
                    <option value="Positive">Positive</option>
                    <option value="Comparative">Comparative</option>
                    <option value="Superlative">Superlative</option>
                </select>
                &nbsp;Degree
            </div>

            <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded-lg mt-4 resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setGotResponse(false)}
                placeholder="Enter your phrase"
                spellCheck={false}
                required
            />

            <button
                className='py-2 px-4 my-3 bg-theme-pink text-white rounded text-sm font-medium hover:bg-theme-pink-600 transition-all duration-300 hover:cursor-pointer ease-out disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isLoading}
                onClick={() => handleAdjectives(text, action)}
            >
                {isLoading ? 'Loading...' : ` Convert to ${to} Degree`}
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

export default Adjectives