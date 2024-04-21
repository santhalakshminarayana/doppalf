import SideBar from '@/components/SideBar';
import ToggleTheme from '@/components/ToggleTheme';
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main>
      <div className='h-dvh flex flex-row w-screen'>
        <SideBar/>
        <div className='flex h-full flex-col self-stretch grow'>
          <div className='flex flex-row-reverse p-4'>
            <ToggleTheme/>
          </div>
            <Chat/>
        </div>
      </div>
    </main>
  );
}
