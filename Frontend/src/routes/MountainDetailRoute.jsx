import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { fetchMountainById, updateMountain } from '../lib/api'
import styles from './MountainDetailRoute.module.css'

export default function MountainDetailRoute() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [mountain, setMountain] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedMountain, setEditedMountain] = useState(null)

    useEffect(() => {
        async function loadMountain() {
            try {
                const data = await fetchMountainById(id)
                setMountain(data)
                setEditedMountain(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadMountain()
    }, [id])

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = async () => {
        try {
            const updatedMountain = await updateMountain(editedMountain)
            setMountain(updatedMountain)
            setIsEditing(false)
        } catch (err) {
            setError(err.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditedMountain(prev => ({
            ...prev,
            [name]: value
        }))
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!mountain) return <div>Mountain not found</div>

    return (
        <div className={styles.detailContainer}>
            <div className={styles.header}>
                <button onClick={() => navigate(-1)} className={styles.backButton}>
                    Back to List
                </button>
                {!isEditing && (
                    <button onClick={handleEdit} className={styles.editButton}>
                        Edit
                    </button>
                )}
                {isEditing && (
                    <button onClick={handleSave} className={styles.saveButton}>
                        Save
                    </button>
                )}
            </div>
            <div className={styles.mountainDetail}>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={editedMountain.name}
                            onChange={handleChange}
                            className={styles.editInput}
                        />
                        <div className={styles.mountainInfo}>
                            <input
                                type="number"
                                name="height"
                                value={editedMountain.height}
                                onChange={handleChange}
                                className={styles.editInput}
                            />
                            <input
                                type="text"
                                name="location"
                                value={editedMountain.location}
                                onChange={handleChange}
                                className={styles.editInput}
                            />
                        </div>
                        <textarea
                            name="description"
                            value={editedMountain.description}
                            onChange={handleChange}
                            className={styles.editTextarea}
                        />
                    </>
                ) : (
                    <>
                        <h2>{mountain.name}</h2>
                        <div className={styles.mountainInfo}>
                            <span className={styles.height}>{mountain.height}m</span>
                            <span className={styles.location}>{mountain.location}</span>
                        </div>
                        <p className={styles.description}>{mountain.description}</p>
                    </>
                )}
            </div>
        </div>
    )
}