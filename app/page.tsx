'use client'
import './globals.css';
import { useEffect, useState } from 'react';
import { getMessages, MsgStruct, submitMessage } from './eth';
import {BackgroundLines} from './welcome';
import Thumb from './card/thumb';

export default function Home() {
    let [messages, setMessages] = useState<MsgStruct[]>([{text: 'Hello, World!', address: 'User1', nickname: 'User1', time: 1693459818}]);

    useEffect(() => {
       async function loadMessages() {
            const ledgerMeesage = await getMessages();
            setMessages(ledgerMeesage);
        }
        loadMessages();
      }, []);

    return (
      <div>
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4" />
      <div>
      <Thumb />
      </div>
        <div>
          <InputBar />
          <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Welcome to Our Website</h1>
                <ul className="space-y-4">
                    {messages.map((msg) => (
                        <li key={msg.time} className="bg-gray-200 p-4 rounded-md border border-gray-300 hover:bg-gray-300 transition duration-300 ease-in-out relative">
                            <p className="text-lg font-semibold text-gray-800">
                                <span className="relative" data-tooltip={msg.address}>{msg.nickname}</span>: {msg.text}
                            </p>
                            {msg.address && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none">
                                    {msg.address}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </div>
      </div>

    );
}

function InputBar() {
  let [inputValue, setInputValue] = useState('');

  const clickHandler = async () => {
    await submitMessage(inputValue, "User1");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
<div className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <input className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" type="text" id='newMessage' placeholder="Write what you want" onChange={handleInputChange} value={inputValue} />
      <button className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out" onClick={clickHandler}>Submit</button>
    </div>
  )
}