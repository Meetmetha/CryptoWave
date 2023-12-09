import React, { useState } from 'react'

const Nfc = () => {
  const [tab, setTab] = useState(0)

  return (
    <div>
      <div className=" rounded-md text-white bg-black">
        <div className="p-2">
          fdsf
        </div>
        <hr />
        <div className="p-2 flex flex-col ">
          <p>$24</p>
          <p>Current Balance</p>
          <p>Current Balance:
            Current Balance</p>
        </div>
      </div>
      <div className=" pt-2">
        <div className=" bg-slate-400  mx-auto mt-2 p-2">
          <button onClick={() => setTab(0)} className={`${tab === 0 ? 'bg-white rounded-sm p-2' : ''}`}>Spend via NFC</button>
          <button onClick={() => setTab(1)} className={`${tab === 1 ? 'bg-white rounded-sm p-2' : ''}`}>Accept via NFC</button>
        </div>
        {
          tab === 0 ?
            (
              <div className=" border rounded-sm mt-4 p-4">
                <p>Make changes to your account here. Click save when you're done.</p>
                <div className="mt-4 w-full h-[100px] bg-slate-300"></div>
              </div>
            )
            : (<div className=" border rounded-sm mt-4 p-4">
              <p>Make changes to your account here. Click save when you're done.</p>
              <div className="mt-4 w-full h-[100px] bg-slate-300"></div>
            </div>)
        }
      </div>
    </div>
  )
}

export default Nfc