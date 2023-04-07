import React, { useState } from 'react'
import axios from 'axios'
import Output from './components/Output'
import getBackgroundColor from './utils/getBackgroundColor'
import './styles/app.sass'

const App = () => {

  const [request, setRequest] = useState()
  const [response, setResponse] = useState()

  const sendRequest = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}`, { command: request })
    setResponse(response.data)
  }

  return (
    <div className="container">
      <header>
        <h1>Pocket HBase</h1>
      </header>
      <div className="prompt">
        <div className="prompt-symbol"></div>
        <input onChange={(event) => setRequest(event.target.value)} />
        <button onClick={sendRequest}>Submit</button>
      </div>
      {response && (
        <main>
          <div
            className="response-status"
            style={{ backgroundColor: getBackgroundColor(response) }}
          >
            <h2>Response</h2>
            <span>{`Executed method ${response.method} with status ${response.status}`}</span>
          </div>
          <Output
            response={response}
            type={response.type}
          />
        </main>
      )}
    </div>
  )
}

export default App
