import { useContext} from 'react'
import { ThemeContext } from '../../context/theme.context'
import cn from 'classnames'

import sun from '../../assets/sun.svg'
import moon from '../../assets/moon.svg'

import styles from './SelectTheme.module.css'

function SelectTheme({text}) {
	const { themeId, setThemeId } = useContext(ThemeContext)

	const changeTheme = () => {
		if (themeId === '1') setThemeId('2')
		else if (themeId === '2') setThemeId('1')
	}

	return (
		<>		
			<p>{text}</p>
			<div className = 
				{cn(styles.themeSwitcher, 
					{ [ styles ['white'] ] : themeId === '1' }, 
					{ [ styles ['dark'] ] : themeId === '2' })
				} onClick={changeTheme}>
				<div 
					className = 
						{cn(styles.choice, 
							{ [ styles ['white'] ] : themeId==='1' }, 
							{ [ styles ['dark'] ] : themeId==='2' })
						}>
				</div>
		
				<img className={styles.moon} src={moon} alt="" />
				<img className={styles.sun} src={sun} alt="" />

			</div>
		</>

	)
}

export default SelectTheme
