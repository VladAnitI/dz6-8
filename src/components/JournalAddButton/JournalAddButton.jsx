import cn from 'classnames'
import { BiMessageSquareAdd } from 'react-icons/bi'
import styles from './JournalAddButton.module.css'

const JournalAddButton = ({ checkMenuClick, selectedAddButton }) => {
	return (
		<>
			<button
				className={cn(styles.addButton, {
					[styles['checked']]: selectedAddButton
				})}
				onClick={() => {
					checkMenuClick('addBtn')
				}}
			>
				<BiMessageSquareAdd />
				<span className={styles.text}>Новое воспоминание</span>
			</button>
		</>
	)
}

export default JournalAddButton
