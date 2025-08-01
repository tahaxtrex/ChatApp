import React from 'react'

function Chatcontainer() {
  return (
    <>
      <div className='flex flex-col h-full'>
        <div className='flex-1 overflow-y-auto'>
          <div className='flex flex-col gap-4 p-4'>
            {messages.map((message)=>(
              <div key={message._id}>{message.content}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Chatcontainer
