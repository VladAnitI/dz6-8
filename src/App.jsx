import { useContext, useState } from 'react';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import LeftPanel from './layouts/Menu/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import MenuList from './components/MenuList/MenuList';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/useLocalStorage.hook';
import { ThemeContext } from './context/theme.context';
import './App.css';


function App() {
	const [arrItems, setArrItems] = useLocalStorage('data');
	const [selectedAddButton, setSelectedAddButton] = useState(false);
	const [selectedItem, setSelectedItem] = useState({});
	const { themeId } = useContext(ThemeContext);

	const checkMenuClick = (target) => {
		if (target === 'addBtn') {
			setSelectedAddButton(true);
			setSelectedItem({});
		}
		if (target === 'item') {
			setSelectedAddButton(false);
		}
	};

	const addItem = (item) => {
		if (!item.id || selectedAddButton) {
			setArrItems([...arrItems, { ...item, id: uuidv4() }]);
			setSelectedAddButton(false);
		} else {
			setArrItems([
				...arrItems.map((el) => {
					if (item.id == el.id) {
						return {
							...item
						};
					}
					return el;
				})
			]);
		}
	};

	const deleteItem = (itemId) => {
		setArrItems([...arrItems.filter((el) => el.id !== itemId)]);
	};

	const selectItem = (item) => {
		if (item) {
			setSelectedItem(item);
		} else setSelectedItem({});
	};

	return (
		<div
			className={cn(
				'app',
				{ darkTheme: themeId === '2' },
				{ whiteTheme: themeId === '1' }
			)}
		>
			<div className="appContainer">
				<div className="header">
					<Header />
				</div>
				<div className="content">
					<LeftPanel>
						<JournalAddButton
							selectedAddButton={selectedAddButton}
							checkMenuClick={checkMenuClick}
						/>
						<MenuList
							className="menuList"
							items={arrItems}
							checkMenuClick={checkMenuClick}
							selectedItem={selectedItem}
							selectItem={selectItem}
							deleteItem={deleteItem}
						/>
					</LeftPanel>
					<Body>
						<JournalForm
							selectedAddButton={selectedAddButton}
							addItem={addItem}
							selectedItem={selectedItem}
							arrItems={arrItems}
						/>
					</Body>
				</div>
			</div>
		</div>
	);
}

export default App;