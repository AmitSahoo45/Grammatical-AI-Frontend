import { GoogleGenerativeAI } from '@google/generative-ai'

// generate a random number between 0 and 2
const random = () => Math.floor(Math.random() * 3)

const generativeAI = new GoogleGenerativeAI(
    random() === 0 ? process.env.NEXT_PUBLIC_GEMINI_PRO_API_KEY_1 as string : process.env.NEXT_PUBLIC_GEMINI_PRO_API_KEY_2 as string
)
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
        and most importantly, never enclose it within backticks. I repeat NEVER!!!!. 

        This result should be string which can be easily converted to JSON using JSON.parse()
        `

        const result = await model.generateContent(prompt)
        let response = await result.response.text()
        return response
    } catch (error) {
        return error as string;
    }
}

export default englishGrammar

export const RewriteSentences = async (request: RequestProps): Promise<string> => {
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
        Your task is to rewrite it strictly according to this given instruction: ${request.action} on the given sentence/phrase and return the appropriate and best solution that a best english teacher will give.
        Very important: Make other changes that may be necessary, but do not change the meaning of each sentence nor go beyond the given instruction.

        Just return the result sentence in the output key and explaination in the explanation key.
    
        Return the output strictly in the this format:
        {
            "output": <result string>,
            "explaination": <explaination string>
        }
        and most importantly, never enclose it within backticks. I repeat NEVER!!!!. 

        This result should be string which can be easily converted to JSON using JSON.parse()
        `

        const result = await model.generateContent(prompt)
        let response = await result.response.text()
        return response
    } catch (error) {
        return error as string;
    }
}

export const FillinTenses = async (request: RequestProps): Promise<string> => {
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
    
        Now based on your knowledge, expertise and these years of experience, you have been given this passage:
        ${request.text}

        The passage consists of number enclosed within brackets, followed by a blank space and a word enclosed within brackets like this (<number>) _______ (<word>) 

        You task is to Fill in each of the numbered blanks with the correct tense form of the word given in brackets. Do not copy the passage, but write in correct serial order the word or phrase appropriate to the blank space.
        Just return the result sentence in the output key and explaination in the explanation key.
    
        Return the output strictly in the this format:
        {
            "output": <result string>,
            "explaination": <explaination string>
        }
        and most importantly, never enclose it within backticks. I repeat NEVER!!!!. 

        This result should be string which can be easily converted to JSON using JSON.parse()
        `

        const result = await model.generateContent(prompt)
        let response = await result.response.text()
        return response
    } catch (error) {
        return error as string;
    }
}

export const DirectAndIndirect = async (request: RequestProps): Promise<string> => {
    try {
        const prompt = `
        Act as an English Language Teacher at one of the most prestigious ICSE English schools in India who has been teaching English Grammar for the past 30 years. You are considered the best English teacher in the world. You have taught over 5000+ students.
        You are the one who has
        a. Expert knowledge of English grammar and language skills
        b. Ability to break down complex concepts 
        c. Very good with vocabulary, idioms, antonyms and synonyms, and other concepts of English Language.
        d. Effective communication skills
        e. Effective Teaching Methods
        f. Creativity
        g. Adaptability and many more
        You are the most perfect English teacher this world will ever see. 
    
        Now based on your knowledge, expertise, and years of experience, you have been given this phrase/sentence -:
        ${request.text}

        The given sentence is either an indirect or a direct speech. 
        Change the speech of the sentence to indirect if it is a direct form and else change it to direct form.
        Please change the speech according to the rules of Direct and Indirect Speech(from Beginner to Advanced) and only give the most appropriate and best answer. 

        Please note: If you are changing from Indirect Speech to Direct Speech, please keep a check of the format of the sentence.
        Make sure it is correct and following the rules of Direct and Indirect Speech.

        Just return the result sentence in the output key and the explanation in the explanation key.
        Return the output strictly in this format:
        {
            "output": <result string>,
            "explaination": <explaination string>
        }
        and most importantly, never enclose it within backticks. I repeat NEVER!!!!. 

        This result should be a string that can be easily converted to JSON using JSON.parse()
        `

        const result = await model.generateContent(prompt)
        let response = await result.response.text()
        return response
    } catch (error) {
        return error as string;
    }
}