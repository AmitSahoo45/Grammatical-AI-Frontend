'use client';

interface ReponseProps {
    result: string,
    explaination: string
}

const ResponseBox = ({ result, explaination }: ReponseProps) => {
    return (
        <>
            <p className='pt-2 border-t-2 border-t-theme-pink w-full mb-4'>
                {result}
            </p>

            <p className='text-sm mb-6'>
                {explaination}
                <br />
                <p className="text-[0.6rem] text-center text-red-700 mt-2 font-bold leading-3">
                    Didn&apos;t like the response? Try again by regenerating the response.
                </p>
            </p>
        </>
    )
}

export default ResponseBox