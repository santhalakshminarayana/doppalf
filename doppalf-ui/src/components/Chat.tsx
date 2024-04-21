'use client';

import { useState } from "react";

import MessageArea from '@/components/MessageArea';
import InputText from '@/components/InputText';

export default function Chat() {
    const [inputDisabled, setInputDisabled] = useState(false)
    const [promptMessages, setPromptMessages] = useState<Array<string>>([]);

    const appendInputPrompt = (message: string) => {
        setPromptMessages((pMsgs) => [...pMsgs, message]);
        setInputDisabled(true);
    }

    const unSetInputDisabled = () => {
        setInputDisabled(false);
    }
    
    return(
        <div className='grow overflow-hidden'>
            <div className='flex flex-col h-full overflow-hidden pt-2 pb-10'>
                <MessageArea 
                    promptMessages={promptMessages} 
                    unSetInputDisabled={unSetInputDisabled}
                />
                <div className='relative w-full px-80'>
                    <InputText 
                        isInputsubmitDisabled={inputDisabled}
                        appendInputPrompt={appendInputPrompt} 
                    />
                </div> 
            </div>
        </div>
    )
}