import React, { useState } from 'react'
import axios from 'axios'
import getBackgroundColor from './utils/getBackgroundColor'
import './styles/app.sass'

const App = () => {

  const [request, setRequest] = useState()
  const [response, setResponse] = useState()

  const sendRequest = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}`, { command: request })
    console.log('setting response', response.data)
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
          <div className="response">
            {response.data && response.data.entries.map((entry) => (
              <>
                <h1>{`Row: ${entry.rowkey}`}</h1>
                <h2>{`Column: ${entry.columnfamily}:${entry.columnqualifier}`}</h2>
                <span>{`Value: ${entry.value}`}</span>
              </>
            ))}
          </div>
        </main>
      )}
    </div>
  )
}

export default App
