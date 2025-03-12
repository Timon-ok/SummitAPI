import { useState, useEffect } from 'react'
import { fetchAllMountains } from '../lib/api'
import styles from './MountainListRoute.module.css'

export default function MountainListRoute() {
    const [mountains, setMountains] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadMountains() {
            try {
                const data = await fetchAllMountains()
                setMountains(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadMountains()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <main className={styles.mountainsContainer}>
            <h2>Mountains List</h2>
            <div className={styles.mountainsGrid}>
                {mountains.map(mountain => (
                    <div key={mountain.id} className={styles.mountainRectangle}>
                        <div className={styles.mountainContent}>
                            <h3>{mountain.name}</h3>
                            <div className={styles.mountainInfo}>
                                <span className={styles.height}>{mountain.height}m</span>
                                <span className={styles.location}>{mountain.location}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}