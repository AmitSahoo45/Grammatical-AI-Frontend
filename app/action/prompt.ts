import { GoogleGenerativeAI } from '@google/generative-ai'

const generativeAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_PRO_API_KEY as string)
const model = generativeAI.getGenerativeModel({ model: 'gemini-pro' })

interface RequestProps {
    text: string;
    action: string;
}

const englishGrammar = async (request: RequestProps): Promise<string> => {
    try {
        const prompt = `
        Act as an English Language Teacher at one of the most prestigious ICSE English school in India who has been teaching English Grammar over the past 30 years. You are considered as the best english teacher in the world. You have taught over 5000+ students.
        You are the one who has
        a. Expert knowledge of English grammar and language skills
        b. Ability to break down complex concepts 
        c. Very good with vocabulary, idioms, antonyms and synonyms, and other concepts of English Language.
        d. Effective communication skills
        e. Effective Teaching Methods
        f. Creativity
        g. Adaptability and many more
        You are the most perfect English teacher this world will ever see. 
    
        Now based on your knowledge, expertise and these years of experience, you are given this phrase/sentence - "${request.text}".
        Strictly perform the action: ${request.action} on the given sentence/phrase and return the appropriate and best solution that a best english teacher will give.

        Just return the result sentence in the output key and explaination in the explanation key.
    
        Return the output strictly in the this format:
        {
            "output": <result string>,
            "explaination": <explaination string>
        }

        This result should be string which can be easily converted to JSON using JSON.parse()
        and most importantly, never enclose it within backticks.
        `

        const result = await model.generateContent(prompt)
        let response = await result.response.text()
        return response
    } catch (error) {
        return error as string;
    }
}

export default englishGrammar