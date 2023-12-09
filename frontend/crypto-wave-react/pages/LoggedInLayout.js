import React from 'react';

const LoggedInLayout = ({ children }) => {
    return (
        <div className=' h-[100vh] bg-slate-200 '>
            <div className=" max-w-sm mx-auto h-full bg-white p-2 overflow-y-scroll">
            <main>{children}</main>
            <footer className='fixed bottom-0 w-[24rem] bg-white z-10'>
                <nav className='w-full p-4 border-t'>
                    <ul className='flex justify-between items-center w-full'>
                        <li><a href="/">Home</a></li>
                        <li><a href="/swap">Swap</a></li>
                        <li><a href="/bond">Bond</a></li>
                        <li><a href="/nfc">NFC</a></li>
                    </ul>
                </nav>
            </footer>
            </div>
        </div>
    );
};

export default LoggedInLayout;
