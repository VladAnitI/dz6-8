// reducer не должен содержать никаких side effect кроме изменения состояния!

export const INITIAL_STATE = {
	isValid: {
		title: true,
		date: true,
		mood: true,
		description: true
	},
	values: {
		title: '',
		date: '',
		mood: '',
		description: '',
		selected: false
	},
	moodDropDownVisibility: false,
	isFormReadyToSubmit: false
}

// (предыдущее состояние, action (type, payload) - что нужно сделать) => {}
export function formReducer(state, action) {
	switch (action.type) {
		// сбросить валидацию (вернуть isValid в исходное состояние)
		case 'RESET_VALIDITY':
			return { ...state, isValid: INITIAL_STATE.isValid }
		// отправка формы
		case 'SUBMIT': {
			const titleValidity = state.values.title?.trim().length
			const dateValidity = state.values.date
			const moodValidity = state.values.mood
			const descriptionValidity = state.values.description?.trim().length
			return {
				...state,
				isValid: {
					title: titleValidity,
					date: dateValidity,
					mood: moodValidity,
					description: descriptionValidity
				},
				isFormReadyToSubmit:
					titleValidity && dateValidity && moodValidity && descriptionValidity
			}
		}

		// появление mood img container
		case 'SET_MOOD_DROPDOWN_VISIBILITY': {
			return { ...state, moodDropDownVisibility: action.payload }
		}
		// установка mood img
		case 'SET_MOOD': {
			return { ...state, values: { ...state.values, mood: action.payload } }
		}
		// установка value
		case 'SET_VALUE': {
			return { ...state, values: { ...state.values, ...action.payload } }
		}
		// очистка формы
		case 'CLEAR': {
			return { ...state, values: INITIAL_STATE.values, isFormReadyToSubmit: false }
		}
	}
}
