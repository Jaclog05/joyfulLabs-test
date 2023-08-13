import React from 'react'
import EventsTable from './components/EventsTable'
import GuestsTable from './components/GuestsTable'
import { eventsData, guestsData } from '@/tableData'
import styles from './page.module.css'

function HomePage() {
  return (
    <div className={styles.wrapper}>
        <EventsTable eventsData={eventsData} />
        <GuestsTable guestsData={guestsData} />
    </div>
  )
}

export default HomePage