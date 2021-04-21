import { useEffect, useState } from 'react'

export function useFetch<T>(url: string, opts?: RequestInit) {
  const [data, setData] = useState<T>(null)
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(url)
      const { data } = await response.json()
      setData(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return { data, loading, error }
}
