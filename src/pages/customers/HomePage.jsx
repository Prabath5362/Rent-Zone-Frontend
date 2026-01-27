import React from 'react'

function HomePage() {
  return (
    <div>
        <h1>Home page</h1>
        <button onClick= {
            ()=>{
                localStorage.clear();
                window.location.reload();
            }
        } className='bg-red-400'>Logout</button>
    </div>
  )
}

export default HomePage