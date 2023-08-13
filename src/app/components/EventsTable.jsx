import React from 'react'
import BaseTable from './BaseTable/BaseTable'



function EventsTable({eventsData}) {
  return (
    <div>
        <h3>Events</h3>
        <BaseTable tableData={eventsData} filterByProp='Event'/>
    </div>
  )
}

export default EventsTable