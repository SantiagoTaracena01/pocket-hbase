import React from 'react'
import '../styles/output.sass'

const Ouptut = ({ response, type }) => {
  switch (type) {
    case 'individual':
      return (
        <div className="output">
          <h1>{response.data}</h1>
        </div>
      )
    case 'array':
      return (
        <div className="output">
          {response.data && response.data.map((entry) => (
            <h1>{entry}</h1>
          ))}
        </div>
      )
    case 'table':
      return (
        <div className="output">
          {response.data && response.data.entries.map((entry) => (
            <div>
              <h1>{`Row: ${entry.rowkey}`}</h1>
              <h2>{`Column: ${entry.columnfamily}:${entry.columnqualifier}`}</h2>
              <span>{`Value: ${entry.value}`}</span>
            </div>
          ))}
        </div>
      )
    default:
      return (
        <div>Loading...</div>
      )
  }
}

export default Ouptut