type Props = {
    isInfoBarOpen: boolean
    infoBarName: string
    toggleInfoBar: (name: string) => void
}

export default function MainSideBar({ isInfoBarOpen, infoBarName, toggleInfoBar }: Props) {
    const onClickIcon = (name: string) => {
        toggleInfoBar(name)
    }

    return (
        <div className={`flex flex-col items-center p-3 ${isInfoBarOpen? "null": "border-solid border-r border-tomato-800/40 dark:border-dark_mint_cream-800/20"}`}>
            <button 
                onClick={() => onClickIcon("actions")}
                className={`flex flex-col justify-center items-center my-2 w-20 h-20 hover:rounded-lg hover:bg-sidebar_icon_bg/20 dark:hover:bg-dark_sidebar_icon_bg/5 ${infoBarName=="actions"?"rounded-lg bg-sidebar_icon_bg/40 dark:bg-dark_sidebar_icon_bg/15": "null"}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-tomato dark:stroke-dark_mint_cream/75 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
                <p className='font-tilt-neon font-semi-bold text-md text-tomato dark:text-dark_mint_cream/75'>Actions</p>
            </button>

            <button
                onClick={() => onClickIcon("collections")} 
                className={`flex flex-col justify-center items-center my-2 w-20 h-20 hover:rounded-lg hover:bg-sidebar_icon_bg/20 dark:hover:bg-dark_sidebar_icon_bg/5 ${infoBarName=="collections"?"rounded-lg bg-sidebar_icon_bg/40 dark:bg-dark_sidebar_icon_bg/15": "null"}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-tomato dark:stroke-dark_mint_cream/75 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                <p className='font-tilt-neon font-semi-bold text-md text-tomato dark:text-dark_mint_cream/75'>Collections</p>
            </button>
        </div>
    )
}