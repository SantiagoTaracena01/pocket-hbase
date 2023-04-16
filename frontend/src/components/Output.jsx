import React from 'react'
import getFormattedDate from '../utils/getFormattedDate'
import '../styles/output.sass'

const Ouptut = ({ response, type }) => {
  switch (type) {
    case 'individual':
      return (
        <div className="output">
          <h1>{response.data}</h1>
        </div>
      )
    case 'object':
      return (
        <div className="output">
          <div className="object-table">
            <div className="object-titles">
              <h1>Name</h1>
              <h1>Column Families</h1>
              <h1>Enabled</h1>
              <h1>Created</h1>
              <h1>Updated</h1>
            </div>
            <div className="object-values">
              <h1>{response.data.name}</h1>
              <h1>{
                (response.data.columnFamilies.toString().length < 200) ?
                  response.data.columnFamilies.toString() :
                  response.data.columnFamilies.toString().slice(0, 200) + '...'
              }</h1>
              <h1>{response.data.enabled.toString()}</h1>
              <h1>{getFormattedDate(response.data.created)}</h1>
              <h1>{getFormattedDate(response.data.updated)}</h1>
            </div>
          </div>
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
          <div className="table">
            <div className="titles">
              <h1 className="title">Row</h1>
              <h1 className="title">Column</h1>
              <h1 className="title">Value</h1>
            </div>
            {response.data && response.data.entries.map((entry) => (
              <React.Fragment>
                <div className="grid-item"><h1>{entry.rowkey}</h1></div>
                <div className="grid-item"><h1>{entry.columnfamily} : {entry.columnqualifier}</h1></div>
                <div className="grid-item"><h1>{entry.value}</h1></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )
    case 'scan':
      return (
        <div className="output">
          <div className="scan-table">
            <div className="scan-titles">
              <h1 className="scan-title">Row</h1>
              <h1 className="scan-title">Column</h1>
              <h1 className="scan-title">Value</h1>
              <h1 className="scan-title">Timestamp</h1>
            </div>
            {response.data && response.data.entries.map((entry) => (
              <React.Fragment>
                <div className="scan-grid-item"><h2>{entry.rowkey}</h2></div>
                <div className="scan-grid-item"><h2>{entry.columnfamily} : {entry.columnqualifier}</h2></div>
                <div className="scan-grid-item"><h2>{entry.value}</h2></div>
                <div className="scan-grid-item"><h2>{entry.timestamp}</h2></div>
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
