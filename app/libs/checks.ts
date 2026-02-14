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
    const jsonResponse = withoutMarkdownFence.match(/\{[\s\S]*\}/)?.[0] || withoutMarkdownFence;

    return JSON.parse(jsonResponse) as Response;
}
