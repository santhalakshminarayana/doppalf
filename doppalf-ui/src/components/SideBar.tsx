'use client';

import { useState } from "react"
import InfoSideBar from "./InfoSideBar"
import MainSideBar from "./MainSideBar"

export default function SideBar() {
    const [isInfoBarOpen, setIsInfoBarOpen] = useState<boolean>(false);
    return (
        <div className="flex flex-row">
            <MainSideBar isInfoBarOpen={isInfoBarOpen} setOpenInfoBar={setIsInfoBarOpen}/>
            {
                isInfoBarOpen?
                <InfoSideBar/>:
                null
            }
        </div>
    )
}