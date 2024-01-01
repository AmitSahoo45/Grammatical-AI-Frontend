'use client';

import { FaLinkedin } from "react-icons/fa";
import Container from "./Container";

const Footer = () => {
    return (
        <Container classes="flex flex-col items-center bg-theme-orange text-white py-3 px-1">
            <span className="inline">
                Made with ❤️ by
                <a className='ml-1 underline' href="https://github.com/AmitSahoo45" target="_blank" rel="noreferrer">
                    Amit Kumar Sahoo
                </a>
            </span>

        </Container>
    )
}

export default Footer