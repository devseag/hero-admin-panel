const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        // Samaja slozhnaja chast' - jeto pokazyvat' novye jelementy po fil'tram
        // pri sozdanii ili udalenii
        case 'HERO_CREATED':
            // Formiruem novyj massiv    
            // let newCreatedHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        case 'HERO_DELETED': 
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload)

            }
        default: return state
    }
}

export default heroes;