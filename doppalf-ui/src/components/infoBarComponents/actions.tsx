import useNewChatSession from "@/hooks/useNewChatSession"

export default function Actions() {
    const {newChatSession, setNewChatSession} = useNewChatSession()

    return (
        <div className="flex flex-column justify-start px-3 py-6 w-fit h-full">
            <button className="flex flex-row h-fit items-center bg-light_sky_blue/10 dark:bg-light_sky_blue/20 p-2 rounded-md"
                onClick={() => setNewChatSession(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-pistachio-300 dark:fill-dark_mint_cream/75 w-4 h-4">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
                <p className="text-md text-pistachio-300 dark:text-dark_mint_cream/75 ml-1">{"New Session"}</p>
            </button>
        </div>
    )
}
