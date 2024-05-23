'use client';

import { useState } from "react"
import InfoSideBar from "./InfoSideBar"
import MainSideBar from "./MainSideBar"

export default function SideBar() {
    const [isInfoBarOpen, setIsInfoBarOpen] = useState<boolean>(false);
    const [infoBarName, setInfoBarName] = useState<string>("");

    const toggleInfoBar = (name: string) => {
        if (infoBarName == name) {
            setIsInfoBarOpen(false)
            setInfoBarName("")
        } else {
            setIsInfoBarOpen(true)
            setInfoBarName(name)
        }
    }

    return (
        <div className="flex flex-row">
            <MainSideBar 
                isInfoBarOpen={isInfoBarOpen} 
                infoBarName={infoBarName}
                toggleInfoBar={toggleInfoBar}
            />
            {
                isInfoBarOpen?
                <InfoSideBar infoName={infoBarName} />:
                null
            }
        </div>
    )
}