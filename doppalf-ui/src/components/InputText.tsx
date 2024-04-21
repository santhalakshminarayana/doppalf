'use client';

import { useEffect, useRef, useState } from "react";

const maxLines = 7;

type PropsType = {
    isInputsubmitDisabled: boolean
    appendInputPrompt: (message: string) => void
}

export default function InputText({ 
    isInputsubmitDisabled, 
    appendInputPrompt, 
}: PropsType
) {
    const [isFocus, setIsFocus] = useState(false);
    const [txt, setTxt] = useState("");
    const [nRows, setNRows] = useState(1);
    const [sendButtonHover, setSendButtonHover] = useState(false);

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const initialInputHeight = useRef(0)

    useEffect(() => {
        initialInputHeight.current = inputRef.current?.clientHeight as number
    }, [])

    const onEnterInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let v = e.target.value

        if (v.length == 0 || v == "\n") {
            setTxt("")
            setNRows(1)
            return
        }

        setTxt(v)
        
        if (inputRef.current) {
            let hc = Math.ceil(inputRef.current.scrollHeight / initialInputHeight.current)
            if (hc > 0) {
                setNRows(Math.min(hc, maxLines))
            } else {
                setNRows(1)
            }
        }
    };

    const onFocusInput = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (!isFocus) {
            setIsFocus(true)
        }
    };

    const onBlurInput = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocus(false)
    };

    const onEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!e.shiftKey && e.key=="Enter" && !isInputsubmitDisabled) {
            setTxt("")
            setNRows(1)
            appendMessage()
            return
        }
    };

    const onClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        setTxt("")
        setNRows(1)
        appendMessage()
        return
    };

    const appendMessage = () => {
        if (inputRef.current) {
            let txt = inputRef.current.textContent
            if (txt != null && txt != "") {
                appendInputPrompt(txt)
            }
        }
    }

    return (
        <div
            className={`relative flex flex-row w-full p-3 bg-tomato-900/40 dark:bg-tomato-800/5 rounded-lg shadow-lg shadow-pistachio-800 dark:shadow-dark_mint_cream-800/20 border border-solid border-tomato-800/40 dark:border-dark_mint_cream/20 ${isFocus? 'shadow-none border-2 border-tomato-800/90 dark:border-dark_mint_cream/40': ''}`}
        >
            <textarea 
            ref={inputRef}
            value={txt}
            autoCapitalize='off'
            rows={nRows}
            onKeyDown={onEnterKey}
            onInput={onEnterInput}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            style={{ "background": "transparent"}}
            className='inputScrollBar w-full text-xl pr-16 h-auto text-rich_black/75 dark:text-dark_mint_cream/75 resize-none outline-none' 
            placeholder='Type to Chat ...'/>
            {
                (txt.length > 0)?
                <button
                    onMouseEnter={() => {setSendButtonHover(true)}}
                    onMouseLeave={() => {setSendButtonHover(false)}}
                    onClick={onClickSubmit}
                    disabled={isInputsubmitDisabled}
                    style={{ opacity: isInputsubmitDisabled?"0.2":"1"}}
                    className="absolute flex w-8 h-8 right-6 bottom-3">
                        {
                            sendButtonHover==false?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-tomato dark:stroke-dark_mint_cream/75 w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>:
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-tomato dark:fill-dark_mint_cream/75 w-8 h-8">
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                            </svg>
                        }
                </button>
                :null}
        </div>
    );
}