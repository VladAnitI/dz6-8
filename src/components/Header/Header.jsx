import { useContext } from 'react'
import cn from 'classnames'
import { IoIosJournal } from 'react-icons/io'
import styles from './Header.module.css'
import SelectTheme from '../SelectTheme/SelectTheme'
import { ThemeContext } from '../../context/theme.context'

const Header = () => {
	const {themeId} = useContext(ThemeContext)

	return (
		<div className = 
			{cn(styles.header, 
				{ [ styles ['white'] ] : themeId==='1' }, 
				{ [ styles ['dark'] ] : themeId==='2' })
			}>
			<IoIosJournal className={styles.logo} />
			<h2>My Journal</h2>
			<SelectTheme/>
		</div>
	)
}

export default Header
