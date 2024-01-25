import cn from 'classnames'
import { useContext } from 'react'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { ThemeContext } from '../../context/theme.context'

import styles from './JournalItem.module.css'

const JournalItem = ({ item, onClick, deleteItem, selectedItem }) => {
	const { themeId } = useContext(ThemeContext)

	return (
		<div
			className={cn(
				styles.journalItem,
				{ [styles['selected']]: item === selectedItem },
				{ [styles['white']]: themeId === '1' },
				{ [styles['dark']]: themeId === '2' }
			)}
			onClick={onClick}
		>
			<div className={styles.header}>
				<div className={cn(styles.imgMood, { [styles[item.mood]]: item.mood })}></div>
				<h3>{item.title}</h3>
			</div>
			<div className={styles.content}>
				<span className={styles.date}>{item.date}</span>

				<span className={styles.text}>
					{item.description.length > 30
						? item.description.slice(0, 30) + '...'
						: item.description}
				</span>
			</div>
			<div className={styles.delete} onClick={() => deleteItem(item.id)}>
				<RiDeleteBinLine className={styles.deleteIcon} />
			</div>
		</div>
	)
}

export default JournalItem
