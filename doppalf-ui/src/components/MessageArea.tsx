'use client';

import { useEffect, useRef, useState } from "react"

import { ChatMessageType } from "@/constants/constants"
import { GENERATE_URL } from "@/constants/urls";
import { getTimestamp, getUUID } from "@/utils/utils";
import { useFetchGenerate } from "@/hooks/useFetchGenerate";

type MessageAreaPropsType = {
    promptMessages: Array<string>,
    unSetInputDisabled: () => void,
}

type StreamMessagePropsType = {
    message: ChatMessageType, 
    updateRenderState: () => void;
    addMessage: (message: string) => void;
    renderError: (message: string) => void;
    alwaysScrollBottom: () => void;
}

function StreamMessage({ message, updateRenderState, addMessage, renderError, alwaysScrollBottom }: StreamMessagePropsType) {
    const [data, setData] = useState("");
    const [currentMessage, setCurrentMessage] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollDivRef = useRef<HTMLDivElement>(null);
    const [divHeight, setDivHeight] = useState(1.125);
    
    const addData = (data: string) => {
        setData((pData) => pData + data)
    }
    
    const {startFetch, stopFetch, isDone, errorMessage} = useFetchGenerate({ 
        url: GENERATE_URL, 
        promptMessage: message,
        addData,
    })

    useEffect(() => {
        startFetch();
    }, []);

    useEffect(() => {
        if (errorMessage!="") {
            updateRenderState();
            renderError(errorMessage);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (currentIndex < data.length) {
            const timeout = setTimeout(() => {
                setCurrentMessage(pMsg => pMsg + data[currentIndex]);
                setCurrentIndex(pId => pId + 1);

                if (scrollDivRef.current && (scrollDivRef.current.scrollHeight > scrollDivRef.current.offsetHeight)) {
                    setDivHeight((pH) => pH * 2)
                    alwaysScrollBottom()
                }
            }, 3);
        
            return () => clearTimeout(timeout);

        } else if (isDone===true && data.length>0 && currentIndex===data.length) {
            updateRenderState();
            addMessage(data);
        }
    }, [data, currentIndex, isDone])

    return (
        <div ref={scrollDivRef} style={{ height: divHeight.toString() + "rem" }} className="max-w-full my-2">
            <p className="max-w-full text-rich_black/75 dark:text-dark_mint_cream/75 text-lg break-words">{currentMessage}
                <span className="animate-ping text-lg bg-rich_black/75 dark:bg-dark_mint_cream/75">{"|"}</span>
            </p>
        </div>
    )
}

function UserMessage(message: ChatMessageType) {
    return (
        <div className="self-end max-w-70 bg-tomato-900/40 dark:bg-dark_mint_cream-800/10 rounded-lg px-3 py-4 my-2" key={message.message_id}>
            <p className="max-w-full text-rich_black/75 dark:text-dark_mint_cream/75 text-lg break-words">{message.message}</p>
        </div>
    )
}

function SystemMessage(message: ChatMessageType) {
    return (
        <div className="max-w-full my-2" key={message.message_id}>
            <p className="max-w-full text-rich_black/75 dark:text-dark_mint_cream/75 text-lg break-words">{message.message}</p>
        </div>
    )
}

function ErrorMessage(message: ChatMessageType) {
    return (
        <div className="max-w-full bg-tomato-900/20 dark:bg-dark_mint_cream-800/10 my-2" key={message.message_id}>
            <p className="max-w-full text-rich_black/75 dark:text-dark_mint_cream/75 text-lg break-words">{"ERROR" + message.message}</p>
        </div>
    )
}


export default function MessageArea({ promptMessages, unSetInputDisabled }: MessageAreaPropsType) {
    const [messages, setMessages] = useState<Array<ChatMessageType>>([]);
    const [render, setRender] = useState<boolean>(false);
    const scrollDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (promptMessages.length > 0) {
            let msg: ChatMessageType = {
                role: "user",
                message_id: getUUID(),
                message: promptMessages[promptMessages.length-1],
                timestamp: getTimestamp(),
            }
            setMessages((pMsgs) => [...pMsgs, msg]);
            setRender(true);
        }
    }, [promptMessages]);

    const updateRenderState = () => {
        setRender(false);
        unSetInputDisabled();
    }

    const addMessage = (message: string)=> {
        let msg: ChatMessageType = {
            role: "system",
            message_id: getUUID(),
            message: message,
            timestamp: getTimestamp(),
        }
        setMessages((pMsgs) => [...pMsgs, msg]);
    }

    const renderError = (message: string) => {
        let msg: ChatMessageType = {
            role: "error",
            message_id: getUUID(),
            message: message,
            timestamp: getTimestamp(),
        }
        setMessages((pMsgs) => [...pMsgs, msg]);
    }

    useEffect(() => {
        if (messages.length > 0) {
            alwaysScrollBottom()
        }
    }, [messages.length]);

    const alwaysScrollBottom = () => {
        scrollDivRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        })
    }

    return (
        <div className='scrollBar flex flex-col h-full px-80 overflow-y-auto'>
            {messages.map((v) => {
                switch (v.role) {
                    case "user":
                        return UserMessage(v);
                    case "system":
                        return SystemMessage(v);
                    case "error":
                        return ErrorMessage(v);
                    default:
                        return null;
                }
            })}
            {
                render?
                <StreamMessage 
                    message={messages[messages.length-1]} 
                    updateRenderState={updateRenderState} 
                    addMessage={addMessage}
                    renderError={renderError}
                    alwaysScrollBottom={alwaysScrollBottom}
                />:
                null
            }
            <div ref={scrollDivRef} className="mt-6"></div>
        </div>
    )
}