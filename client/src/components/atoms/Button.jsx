import { Button } from "flowbite-react";

const button = ({ content, onClick, type = "button", disabled = false, className }) => {
    return (
        <div>
            <Button
                type={type}
                onClick={onClick}
                outline
                className={`${className ||  'bg-[#fecb2e] hover:!bg-[#fecb2e] w-full'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={disabled}
            >
                {content}
            </Button>
        </div>
    )
}

export default button
