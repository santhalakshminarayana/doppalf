import React from "react";

export type NewChatSessionContextType = {
    newChatSession: boolean
    setNewChatSession: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewChatSessionContext = React.createContext<NewChatSessionContextType|null>(null)