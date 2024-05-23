import Actions from "@/components/infoBarComponents/actions";
import Collections from "@/components/infoBarComponents/collections"

export default function InfoSideBar({ infoName }: {infoName: string}) {
    return (
        <div className="w-auto h-full flex bg-tomato-800/10 dark:bg-dark_mint_cream-800/5 border-solid border-r border-tomato-800/40 dark:border-dark_mint_cream-800/20">
            {(() => {
                switch (infoName) {
                    case "actions":
                        return <Actions/>
                    case "collections":
                        return <Collections/>
                    default:
                        return null
                }
            })()}
        </div>
    )
}