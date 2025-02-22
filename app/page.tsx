'use client'
import './globals.css';
import {BackgroundLines} from './welcome';
import Thumb from './card/thumb';
import {AuthProvider} from './context/Auth';

export default function Home() {

    return (
      <div>
        <AuthProvider>
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4" />
        <div>
        <Thumb />
        </div>
        </AuthProvider>
      </div>

    );
}