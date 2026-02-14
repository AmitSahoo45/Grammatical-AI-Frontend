import Filter from 'bad-words';

interface Response {
    output: string;
    explaination: string;
}

export const CheckString = (text: string) => {
    if (text === '' || !text)
        throw new Error('Where text?🤔');

    if (text.length < 3)
        throw new Error('Too short!🤡');

    const filter = new Filter();
    const isProfane = filter.isProfane(text);

    if (isProfane)
        throw new Error("Stop using cuss words guys! It's inappropriate!🤬");
}

export function parseResponse(response: string): Response {
    const trimmedResponse = response.trim();
    const withoutMarkdownFence = trimmedResponse
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```$/i, '');
    try {
        return JSON.parse(withoutMarkdownFence) as Response;
    } catch (initialError) {
        const firstBracketIndex = withoutMarkdownFence.indexOf('{');
        let bracketDepth = 0;
        let startIndex = -1;
        let inString = false;
        let isEscaped = false;

        if (firstBracketIndex !== -1) {
            for (let charIndex = firstBracketIndex; charIndex < withoutMarkdownFence.length; charIndex++) {
                const currentChar = withoutMarkdownFence[charIndex];

                if (currentChar === '"' && !isEscaped) {
                    inString = !inString;
                }

                if (!inString) {
                    if (currentChar === '{') {
                        if (bracketDepth === 0) startIndex = charIndex;
                        bracketDepth++;
                    } else if (currentChar === '}') {
                        bracketDepth--;
                        if (bracketDepth === 0 && startIndex !== -1) {
                            const jsonResponse = withoutMarkdownFence.slice(startIndex, charIndex + 1);
                            return JSON.parse(jsonResponse) as Response;
                        }
                    }
                }

                isEscaped = currentChar === '\\' && !isEscaped;
            }
        }

        const reason = initialError instanceof Error ? initialError.message : 'Unknown parse error';
        throw new Error(`Unable to parse AI response. Please try again. (${reason})`);
    }
}
