import styles from './MenuList.module.css'
import JournalItem from '../JournalItem/JournalItem'

const MenuList = ({ items, selectItem, deleteItem, selectedItem, checkMenuClick }) => {
	return (
		<>
			{items.length === 0 ? (
				<p className={styles.text}>Нет воспоминаний...</p>
			) : (
				items.map((item) => (
					<JournalItem
						item={item}
						key={item.id}
						selectedItem={selectedItem}
						onClick={() => {
							selectItem(item)
							checkMenuClick('item')
						}}
						deleteItem={deleteItem}
					/>
				))
			)}
		</>
	)
}

export default MenuList
