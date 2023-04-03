import React, { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [request, setRequest] = useState()

  const sendRequest = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}`, { command: request })
    // console.log(response)
  }

  return (
    <div>
      <input onChange={(event) => setRequest(event.target.value)} />
      <button onClick={sendRequest}>Submit</button>
    </div>
  )
}

export default App
