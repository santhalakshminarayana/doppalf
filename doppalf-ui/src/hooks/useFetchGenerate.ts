import { useCallback, useEffect, useState } from "react";

import { fetchEventSource } from '@microsoft/fetch-event-source';

import { ChatMessageType } from "@/constants/constants";

type PropTypes = {
    url: string,
    promptMessage: ChatMessageType,
    addData: (data: string) => void,
}

export const useFetchGenerate = ({ url, promptMessage, addData}: PropTypes) => {
    const [abortController, setAbortController] = useState<AbortController | null>(null);
    const [isDone, setIsDone] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const startFetch = useCallback(() => {
        const newAbortController = new AbortController();
        setAbortController(newAbortController);
        const signal = newAbortController.signal;

        const fetchData = async () => {
            try {
                await fetchEventSource(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(promptMessage),
                    signal: signal,
                    openWhenHidden: true,
                    
                    onopen: async (res) => {
                        if (res.status >= 400 && res.status < 500 && res.status !== 429) {
                            console.log("Client Side error:", res);
                            setIsDone(true);
                            setErrorMessage("Un-expected Error.");
                            abortController!!.abort(); 
                            setAbortController(null);
                        } else if (res.status != 200) {
                            console.log("Server side error:", res);
                            setIsDone(true);
                            setErrorMessage("Error fetching data. Server error.");
                            abortController!!.abort(); 
                            setAbortController(null);
                        }
                    },
    
                    onmessage: async (event) =>{
                        addData(JSON.parse(event.data).message)
                    },
    
                    onclose: () => {
                        setIsDone(true);
                        setAbortController(null);
                    },
    
                    onerror: (err) => {
                        throw err;
                    }
                })
            } catch (e) {
                console.log("Error fetching data:", e)
                abortController?.abort()
                setIsDone(true);
                setErrorMessage("Error fetching data.");
                setAbortController(null);
            }
        };

        fetchData();
    }, []);

    const stopFetch = useCallback(() => {
        if (abortController) {
            abortController.abort();
            setAbortController(null);
            setIsDone(true);
            setErrorMessage("Stopped and Aborted.");
        }
    }, [abortController]);


    useEffect(() => {
        return () => {
            setAbortController(null);
            setIsDone(true);
        };
    }, [abortController]);

    return {startFetch, stopFetch, isDone, errorMessage};
}