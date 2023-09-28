import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { createSelector } from 'reselect';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

// Zadacha dlja jetogo komponenta:
// Pri klike na "krestik" idet udalenie personazha iz obshhego sostojanija
// Uslozhnennaja zadacha:
// Udalenie idet i s json fajla pri pomoshhi metoda DELETE

const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) =>{
            if (filter === 'all') {
                console.log('render');
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    );

    // const someState = useSelector(state => ({
    //     activeFilter: state.filters.activeFilter,
    //     heroes: state.heroes.heroes
    // })) wrong method

    // const filteredHeroes = useSelector(state => {
    //     if (state.filters.activeFilter === 'all') {
    //         console.log('render');
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter)
    //     }
    // })
    
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    // Funkcija beret id i po nemu udaljaet nenuzhnogo personazha iz store
    // TOL''KO esli zapros na udalenie proshel uspeshno
    // Otslezhivajte cepochku dejstvij actions => reducers
    const onDelete = useCallback((id) => {
        // Udalenie personazha po ego id
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Oshibka zagruzki</h5>
    }

    const renderHeroesList = (arr) => {
        // if (arr.length === 0) {
        //     return <h5 className="text-center mt-5">Geroev poka net</h5>
        // }
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Geroev poka net</h5>
                </CSSTransition>
            )
        }        

        return arr.map(({id, ...props}) => {
            // return <HeroesListItem key={id} {...props}/>
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    // const elements = renderHeroesList(heroes);
    const elements = renderHeroesList(filteredHeroes);
    return (
        // <ul>
        <TransitionGroup component="ul">      
            {elements}
        {/* </ul> */}
        </TransitionGroup>          
    )
}

export default HeroesList;