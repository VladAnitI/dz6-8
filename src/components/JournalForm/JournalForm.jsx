import { useEffect, useReducer, useRef, useContext } from 'react'
import { BsCalendarDate, BsJournalText, BsBookmark } from 'react-icons/bs'
import { TbMoodCog } from 'react-icons/tb'
import cn from 'classnames'

import { ThemeContext } from '../../context/theme.context'
import styles from './JournalForm.module.css'
import { INITIAL_STATE, formReducer } from './JournalForm.state'

import verySadMood from '../../assets/moods/very-sad.svg'
import sadMood from '../../assets/moods/sad.svg'
import neutralMood from '../../assets/moods/neutral.svg'
import happyMood from '../../assets/moods/happy.svg'
import veryHappyMood from '../../assets/moods/very-happy.svg'

const JournalForm = ({ addItem, selectedItem, arrItems, selectedAddButton }) => {
	// использование useReducer
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
	const { isValid, values, isFormReadyToSubmit, moodDropDownVisibility } = formState // деструктуризация состояния
	// использование useRef
	const titleRef = useRef() // в элементе атрибут ref={titleRef}
	const dateRef = useRef()
	const moodRef = useRef()
	const descriptionRef = useRef()

	// использование useContext
	const { themeId } = useContext(ThemeContext)

	// Функция для фокуса по невалидным элементам
	const focusError = (isValid) => {
		if (!isValid.title) titleRef.current.focus()
		else if (!isValid.date) dateRef.current.focus()
		else if (!isValid.mood) moodRef.current.focus()
		else if (!isValid.description) descriptionRef.current.focus()
	}

	useEffect(() => {
		const handleDocumentClick = (e) => {
			// Проверка, если клик был вне контейнера настроения
			if (moodRef.current && !moodRef.current.contains(e.target)) {
				// Закрыть выпадающий список
				dispatchForm({ type: 'SET_MOOD_DROPDOWN_VISIBILITY', payload: false })
			}
		}

		// Присоединение обработчика событий к документу
		document.addEventListener('click', handleDocumentClick)

		// Отмена регистрации обработчика событий при размонтировании компонента
		return () => {
			document.removeEventListener('click', handleDocumentClick)
		}
	}, [dispatchForm])

	// Выполнять dispatchForm с данными item при изменении selectedItem (если какой то journalItem был выбран)
	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { ...selectedItem } })
	}, [selectedItem])

	// проверка валидности
	useEffect(() => {
		let timer
		if (!isValid.title || !isValid.date || !isValid.mood || !isValid.description) {
			focusError(isValid)
			timer = setTimeout(() => dispatchForm({ type: 'RESET_VALIDITY' }), 1500)
		}
		return () => clearTimeout(timer)
	}, [isValid])

	// отслеживаем isFormReadyToSubmit, если true отправляем данные
	useEffect(() => {
		if (isFormReadyToSubmit) {
			addItem(values)
			dispatchForm({ type: 'CLEAR' })
		}
		// если мы что-то делаем с values, то isFormReadyToSubmit может это не отреагировать,
		// поэтому мы также должны добавить в зависимости addItem, values
	}, [isFormReadyToSubmit, values, addItem])

	useEffect(() => {
		dispatchForm({ type: 'CLEAR' })
	}, [arrItems])

	useEffect(() => {
		if (selectedAddButton) {
			dispatchForm({ type: 'CLEAR' })
		}
	}, [selectedAddButton])

	const changeValue = (e) => {
		// e.target.name - имя поля
		// e.target.value - значение поля
		// [] - для получения computed key в объекте

		dispatchForm({
			type: 'SET_VALUE',
			payload: { [e.target.name]: e.target.value }
		})
	}

	const addJournalItem = (e) => {
		e.preventDefault()
		dispatchForm({ type: 'SUBMIT' })
	}

	const selectMood = (mood) => {
		dispatchForm({ type: 'SET_MOOD', payload: mood })
	}

	return (
		<form
			className={cn(
				styles.JournalForm,
				{ [styles['white']]: themeId === '1' },
				{ [styles['dark']]: themeId === '2' }
			)}
			onSubmit={addJournalItem}
		>
			<div className={styles.titleContainer}>
				<label htmlFor='title'>
					<BsBookmark className={styles.labelLogo} />
					<span className={styles.labelText}>Название:</span>
				</label>
				<input
					// для cn:
					// выражения заключаются в {}
					// несколько классов указываются через запятую:
					// className={cn(styles["test"], { [styles["invalid"]]: !formValidState.title })}
					className={cn({ [styles['invalid']]: !isValid.title })}
					type='text'
					id='title'
					name='title'
					placeholder='укажите название воспоминания'
					onChange={changeValue}
					ref={titleRef}
					value={values.title}
				/>
			</div>
			<div className={styles.moodContainer}>
				<label htmlFor='mood'>
					<TbMoodCog className={styles.labelLogo} />
					<span className={styles.labelText}>Настроение:</span>
				</label>
				<div
					className={cn(styles.moodDropdownContainer, {
						[styles['active']]: moodDropDownVisibility
					})}
				>
					<div
						className={styles.moodVerySad}
						onClick={() => {
							selectMood('verySadMood')
						}}
					>
						<img src={verySadMood} alt='Ужасное' />
						<p>Ужасное</p>
					</div>
					<div
						className={styles.moodSad}
						onClick={() => {
							selectMood('sadMood')
						}}
					>
						<img src={sadMood} alt='Плохое' />
						<p>Плохое</p>
					</div>
					<div
						className={styles.moodNeutral}
						onClick={() => {
							selectMood('neutralMood')
						}}
					>
						<img src={neutralMood} alt='Нейтральное' />
						<p>Нейтральное</p>
					</div>
					<div
						className={styles.moodHappy}
						onClick={() => {
							selectMood('happyMood')
						}}
					>
						<img src={happyMood} alt='Хорошее' />
						<p>Хорошее</p>
					</div>
					<div
						className={styles.moodVeryHappy}
						onClick={() => {
							selectMood('veryHappyMood')
						}}
					>
						<img src={veryHappyMood} alt='Отличное' />
						<p>Отличное</p>
					</div>
				</div>
				{/* {values.mood && (
					<div className={styles.selectedMood}>
						<img src={values.mood} alt='Выбранное настроение' />
					</div>
				)} */}
				<input
					className={cn(
						styles.moodInput,
						{ [styles['invalid']]: !isValid.mood },

						styles[values.mood]
					)}
					type='text'
					id='mood'
					name='mood'
					// onChange={changeValue}
					ref={moodRef}
					value={
						(values.mood === 'verySadMood' && 'Ужасное') ||
						(values.mood === 'sadMood' && 'Плохое') ||
						(values.mood === 'neutralMood' && 'Нейтральное') ||
						(values.mood === 'happyMood' && 'Хорошее') ||
						(values.mood === 'veryHappyMood' && 'Отличное') ||
						(!values.mood && '')
					}
					placeholder='нажмите, чтобы выбрать настроение'
					onFocus={(e) => {
						e.preventDefault()
					}}
					onClick={() => {
						dispatchForm({ type: 'SET_MOOD_DROPDOWN_VISIBILITY', payload: true })
					}}
					readOnly
				/>
			</div>
			<div className={styles.dateContainer}>
				<label htmlFor='date'>
					<BsCalendarDate className={styles.labelLogo} />
					<span className={styles.labelText}>Дата:</span>
				</label>
				<input
					className={cn(
						{ [styles['invalid']]: !isValid.date },
						{ [styles['noDate']]: !values.date }
					)}
					type='date'
					placeholder='нажмите, для выбора даты'
					id='date'
					name='date'
					onChange={changeValue}
					ref={dateRef}
					value={values.date}
				/>
			</div>

			<div className={styles.description}>
				<label htmlFor='description'>
					<BsJournalText className={styles.labelLogo} />
					<span className={styles.labelText}>Описание:</span>
				</label>
				<textarea
					className={cn({ [styles['invalid']]: !isValid.description })}
					name='description'
					id='description'
					placeholder='расскажите о своём дне...'
					onChange={changeValue}
					ref={descriptionRef}
					value={values.description}
				></textarea>
			</div>

			<button>Сохранить</button>
		</form>
	)
}

export default JournalForm
