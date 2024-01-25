import { useState, useEffect } from 'react'

export function useLocalStorage(key) {
	// привязан к тому компоненту, где мы будем вызывать этот хук
	const [data, setData] = useState([])

	// получение данных
	useEffect(() => {
		const res = JSON.parse(localStorage.getItem(key))
		if (res) {
			setData(res)
		}
	}, [key])

	// отправка данных
	const saveData = (data) => {
		localStorage.setItem(key, JSON.stringify(data))
		setData(data)
	}

	return [data, saveData]
}
