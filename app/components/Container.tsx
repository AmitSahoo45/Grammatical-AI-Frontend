'use client';

interface ContainerProps {
    children: React.ReactNode, 
    classes?: string;
};

const Container: React.FC<ContainerProps> = ({ children, classes }) => {
    return (
        <div className={`max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 ${classes}`}>
            {children}
        </div>
    );
}

export default Container;