import React from 'react'
import BaseTable from './BaseTable/BaseTable'

function GuestsTable({guestsData}) {
  return (
    <div>
        <h3>Guests</h3>
        <BaseTable tableData={guestsData} filterByProp='Contact'/>
    </div>
  )
}

export default GuestsTable