'use client';

import { useEffect, useState } from "react";

import MessageArea from '@/components/MessageArea';
import InputText from '@/components/InputText';
import { NEW_SESSION_URL } from "@/constants/urls";
import useNewChatSession from "@/hooks/useNewChatSession";

export default function Chat() {
    const [inputDisabled, setInputDisabled] = useState(false)
    const [promptMessages, setPromptMessages] = useState<Array<string>>([]);
    const {newChatSession, setNewChatSession} = useNewChatSession();
    const [clearMessages, setClearMessages] = useState(false);

    const appendInputPrompt = (message: string) => {
        setPromptMessages((pMsgs) => [...pMsgs, message]);
        setInputDisabled(true);
    }

    const unSetInputDisabled = () => {
        setInputDisabled(false);
    }

    const newSession = () => {
        fetch(NEW_SESSION_URL, {
            method: "POST",
        }).catch((err) => console.log(err))
    };

    useEffect(() => {
        newSession();
    }, []);

    useEffect(() => {
        if (promptMessages.length != 0 && newChatSession==true) {
            newSession();
            setPromptMessages([]);
            setInputDisabled(false);
            setClearMessages(true);
        } else {
            setClearMessages(false);
        }
        setNewChatSession(false);
    }, [newChatSession])
    
    return(
        <div className='grow overflow-hidden'>
            <div className='flex flex-col h-full overflow-hidden pt-2 pb-10'>
                <MessageArea 
                    promptMessages={promptMessages} 
                    unSetInputDisabled={unSetInputDisabled}
                    clearMessages={clearMessages}
                />
                <div className='relative flex flex-row w-full justify-center items-center'>
                    <div className="w-1/2">
                        <InputText 
                            isInputsubmitDisabled={inputDisabled}
                            appendInputPrompt={appendInputPrompt} 
                        />
                    </div>
                </div> 
            </div>
        </div>
    )
}