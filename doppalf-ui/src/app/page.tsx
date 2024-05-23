'use client';

import { useState } from 'react';

import SideBar from '@/components/SideBar';
import ToggleTheme from '@/components/ToggleTheme';
import Chat from "@/components/Chat";

import { NewChatSessionContext} from '@/context/newChatSessionContext';

export default function Home() {
  const [newChatSession, setNewChatSession] = useState<boolean>(false)

  return (
    <main>
      <NewChatSessionContext.Provider value = {{ newChatSession, setNewChatSession }}>
        <div className='h-dvh flex flex-row w-screen'>
          <SideBar/>
          <div className='flex h-full flex-col self-stretch grow'>
            <div className='flex flex-row-reverse p-4'>
              <ToggleTheme/>
            </div>
              <Chat/>
          </div>
        </div>
      </NewChatSessionContext.Provider>
    </main>
  );
}
