
import { useEffect, useState } from "react"
import axios from "axios"

export default function useFetch<T>(url: string, id: string | null | undefined): {
    data: T | undefined,
    loading: boolean,
    error: unknown
} {

    const [data, setData] = useState<T | undefined>()
    const [error, setError] = useState<unknown>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        (
            async function () {
                try {
                    setLoading(true)
                    const response = await axios.get(url)
                    if (id) {
                        setData(response.data.filter((item: { id: string }) => item.id == id)[0])
                    } else {
                        setData(response.data)
                    }
                    console.log(response.data);
                } catch (err: unknown) {
                    setError(err)
                } finally {
                    setLoading(false)
                }
            }
        )()
    }, [id, url])

    return { data, error, loading }

}