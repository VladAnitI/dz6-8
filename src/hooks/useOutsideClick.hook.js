import { useEffect, useRef, useCallback } from 'react'

const useOutsideClick = (callback) => {
	const ref = useRef()

	const handleClickOutside = useCallback(
		(event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback()
			}
		},
		[callback]
	)

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [handleClickOutside])

	return ref
}

export default useOutsideClick
