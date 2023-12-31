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

    if (text.length > 400)
        throw new Error('Too long!🙁');

    const filter = new Filter();
    const isProfane = filter.isProfane(text);

    if (isProfane)
        throw new Error("Stop using cuss words guys! It's inappropriate!🤬");
}

export function parseResponse(response: string): Response {
    return JSON.parse(response) as Response;
}