import { createContext, useState } from 'react'

export const ThemeContext = createContext({
	themeId: '1'
})

export const ThemeContextProvider = ({children}) => {
	const [themeId, setThemeId] = useState('1')
	
	return <ThemeContext.Provider value={ { themeId, setThemeId } }>
		{ children }
	</ThemeContext.Provider>
}