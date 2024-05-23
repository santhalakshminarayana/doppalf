import { NewChatSessionContext } from "@/context/newChatSessionContext";
import { useContext } from "react";


export default function useNewChatSession() {
    const newChatSession = useContext(NewChatSessionContext)
    if (newChatSession) {
        return newChatSession
    }

    throw new Error("Context is null")
}