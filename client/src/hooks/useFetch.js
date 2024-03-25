import axios from 'axios'

const { useEffect } = require("react")
const { useState } = require("react")

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoadind] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoadind(true)
            try {
                const res = await axios.get(url)
                setData(res.data)
            } catch (err) {
                setError(err)
            }
            setLoadind(false)
        }
        fetchData()
    }, [url])

    const reFetch = async () => {
        setLoadind(true)
        try {
            const res = await axios.get(url)
            setData(res.data)
        } catch (err) {
            setError(err)
        }
        setLoadind(false)
    }

    return { data, loading, error, reFetch }
}

export default useFetch
