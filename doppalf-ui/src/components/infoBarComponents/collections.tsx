'use client';

import { COLLECTIONS_URL } from "@/constants/urls";
import { useEffect, useState } from "react";

function Loader() {
    return (
        <div className="flex flex-col px-3 py-6 w-fit h-full">
            <div className="space-y-3 animate-pulse">
                <div className="rounded-full bg-pistachio-300/25 dark:bg-light_sky_blue/45 h-4 w-40"></div>
                <div className="rounded-full bg-pistachio-300/15 dark:bg-light_sky_blue/30 w-36 h-3 ml-4"></div>
                <div className="rounded-full bg-pistachio-300/15 dark:bg-light_sky_blue/30 w-36 h-3 ml-4"></div>
            </div>
        </div>
    )
}

function ShowCollections({ collections }: { collections: Array<string>}) {
    return (
        <div className="flex flex-col px-3 py-6 w-fit h-full">
            <p className="text-lg text-pistachio-300 dark:text-dark_mint_cream/75">{"Collections"}</p>
            <ul className="list-inside list-disc text-md text-pistachio-300/80 dark:text-dark_mint_cream/65 ml-2">
                {collections.map((v: string, id: number) => {
                    return <li key={id}>{v}</li>
                })}
            </ul>
        </div>
    )
}

export default function Collections() {
    const [toRender, setToRender] = useState(false);
    const [collections, SetCollections] = useState<Array<string>>([]);

    const fetchCollections = async () => {
        try {
            const response = await fetch(COLLECTIONS_URL);
            
            if (!response.ok) {
                console.log("Error fetching collections. Response error.")
            }
            
            const data = await response.json();
            SetCollections(data.collections);
            setToRender(true);

        } catch (err) {
            console.error('Error fetching collections:', err);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    return (
        toRender?<ShowCollections collections={collections}/>:<Loader/>
    )
}