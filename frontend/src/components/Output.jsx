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
          <div className='table'>
          <div className='titles'>
            <h1 className='title'>Row</h1>
            <h1 className='title'>Column</h1>
            <h1 className='title'>Value</h1>
          </div>
            {response.data && response.data.entries.map((entry) => (
              <React.Fragment>
                <div className='grid-item'><h1>{entry.rowkey}</h1></div>
                <div className='grid-item'><h1>{entry.columnfamily} : {entry.columnqualifier}</h1></div>
                <div className='grid-item'><h1>{entry.value}</h1></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )
    default:
      return (
        <div>Loading...</div>
      )
  }
}

export default Ouptut
