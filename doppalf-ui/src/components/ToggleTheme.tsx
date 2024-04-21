'use client';

import { useEffect, useReducer } from 'react';

function reducer(_: boolean, action: {value: boolean}): boolean {
    return action.value
}

export default function ToggleTheme() {
    // Check if there is localstorage set for dark-mode.
    // If no key, then disable dark-mode
    const isDarkModeEnabled = localStorage.getItem('darkMode');
    const [darkMode, dispatch] = useReducer(reducer, isDarkModeEnabled && isDarkModeEnabled=="true"? true: false)

    const toggleTheme = () => {
        if(!darkMode) {
            dispatch({ value: true});
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            dispatch({ value: false});
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    };

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode');
        // If the localstorage key exists and it is false and also the state is also false
        // then disable dark-mode
        if ((isDarkMode && isDarkMode=="false") && darkMode==false) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
            return
        }

        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        // If no localstorage key exists, then create one with the preferred mode
        if (isDarkMode==undefined) {
            if (prefersDarkMode) {
                dispatch({ value: true});
                document.documentElement.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
            } else {
                dispatch({ value: false});
                document.documentElement.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
                return
            }
        }

    }, []);

    return (
        <button
            aria-label='Toggle Theme'
            type='button'
            onClick={toggleTheme}
        >
            {
                darkMode?
                // Sun Icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-dark_mint_cream/75 hover:fill-dark_mint_cream/75 w-6 h-6" fill='none'>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
                :
                // Moon Icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-tomato hover:fill-tomato w-6 h-6" fill='none'>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
            }
        </button>
    )
}