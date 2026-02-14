import { GoogleGenAI } from '@google/genai'

// generate a random number between 0 and 2
const random = () => Math.floor(Math.random() * 3)

const generativeAI = new GoogleGenAI({
    apiKey: random() === 0 ? process.env.NEXT_PUBLIC_GEMINI_PRO_API_KEY_1 as string : process.env.NEXT_PUBLIC_GEMINI_PRO_API_KEY_2 as string
})

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

        const result = await generativeAI.models.generateContent({
            model: 'gemini-1.5-pro',
            contents: prompt
        })
        let response = result.text || ''
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

        const result = await generativeAI.models.generateContent({
            model: 'gemini-1.5-pro',
            contents: prompt
        })
        let response = result.text || ''
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

        const result = await generativeAI.models.generateContent({
            model: 'gemini-1.5-pro',
            contents: prompt
        })
        let response = result.text || ''
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

        const result = await generativeAI.models.generateContent({
            model: 'gemini-1.5-pro',
            contents: prompt
        })
        let response = result.text || ''
        return response
    } catch (error) {
        return error as string;
    }
}

export const SubjectVerbAgreement = async (request: RequestProps): Promise<string> => {
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

        Your task is to check and correct the subject-verb agreement in the given sentence.
        Analyze the subject and verb in the sentence and ensure they agree in number (singular/plural) and person (first/second/third).
        If the sentence is correct, return it as is. If there's an error, return the corrected sentence.
        
        Provide a clear explanation of:
        - Whether the original sentence had correct subject-verb agreement
        - What changes were made (if any) and why
        - The rule of subject-verb agreement that applies to this sentence

        Just return the result sentence in the output key and the explanation in the explanation key.
        Return the output strictly in this format:
        {
            "output": <result string>,
            "explaination": <explaination string>
        }
        and most importantly, never enclose it within backticks. I repeat NEVER!!!!. 

        This result should be a string that can be easily converted to JSON using JSON.parse()
        `

        const result = await generativeAI.models.generateContent({
            model: 'gemini-1.5-pro',
            contents: prompt
        })
        let response = result.text || ''
        return response
    } catch (error) {
        return error as string;
    }
}

export const ConditionalSentences = async (request: RequestProps): Promise<string> => {
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

        Your task is to analyze and work with conditional sentences based on the instruction: ${request.action}
        
        Conditional sentences have different types:
        - Zero Conditional (general truths): If + present simple, present simple
        - First Conditional (real possibility): If + present simple, will + infinitive
        - Second Conditional (hypothetical present/future): If + past simple, would + infinitive
        - Third Conditional (hypothetical past): If + past perfect, would have + past participle
        - Mixed Conditional: combinations of the above

        Analyze the given sentence, identify the conditional type (if applicable), and perform the requested action.
        Provide the corrected or converted sentence along with a detailed explanation.

        Just return the result sentence in the output key and the explanation in the explanation key.
        Return the output strictly in this format:
        {
            "output": <result string>,
            "explaination": <explaination string>
        }
        and most importantly, never enclose it within backticks. I repeat NEVER!!!!. 

        This result should be a string that can be easily converted to JSON using JSON.parse()
        `

        const result = await generativeAI.models.generateContent({
            model: 'gemini-1.5-pro',
            contents: prompt
        })
        let response = result.text || ''
        return response
    } catch (error) {
        return error as string;
    }
}

export const NegativeSentences = async (request: RequestProps): Promise<string> => {
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

        Your task is to convert the given sentence based on this instruction: ${request.action}
        
        If the sentence is affirmative (positive), convert it to negative.
        If the sentence is negative, convert it to affirmative (positive).
        
        Follow proper grammar rules for negative sentences:
        - Use of 'not' with auxiliary verbs (do not, does not, did not, is not, are not, was not, were not, etc.)
        - Use of negative contractions when appropriate (don't, doesn't, didn't, isn't, aren't, wasn't, weren't, etc.)
        - Proper placement of 'not' in the sentence
        - Handling of negative words like 'never', 'nobody', 'nothing', 'nowhere', etc.

        Provide a clear explanation of:
        - Whether the original sentence was positive or negative
        - What changes were made and why
        - The grammatical structure used in the conversion

        Just return the result sentence in the output key and the explanation in the explanation key.
        Return the output strictly in this format:
        {
            "output": <result string>,
            "explaination": <explaination string>
        }
        and most importantly, never enclose it within backticks. I repeat NEVER!!!!. 

        This result should be a string that can be easily converted to JSON using JSON.parse()
        `

        const result = await generativeAI.models.generateContent({
            model: 'gemini-1.5-pro',
            contents: prompt
        })
        let response = result.text || ''
        return response
    } catch (error) {
        return error as string;
    }
}