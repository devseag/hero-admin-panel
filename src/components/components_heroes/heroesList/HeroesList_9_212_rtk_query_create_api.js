// import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
// import { createSelector } from 'reselect';
// import { createSelector } from '@reduxjs/toolkit';

// import {fetchHeroes } from '../../actions';
// import { heroDeleted, fetchHeroes, selectAll, filteredHeroesSelector } from './heroesSlice';
// import {
// 	heroDeleted,
// 	fetchHeroes,
// 	filteredHeroesSelector,
// } from "./heroesSlice";
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {

    // const filteredHeroesSelector = createSelector(
    //     (state) => state.filters.activeFilter,
    //     // (state) => state.heroes.heroes,
    //     // (state) => state.heroes.entities,
    //     selectAll,
    //     (filter, heroes) =>{
    //         // console.log(heroes);
    //         if (filter === 'all') {
    //             // console.log('render');
    //             return heroes;
    //         } else {
    //             return heroes.filter(item => item.element === filter)
    //         }
    //     }
    // );

    const {
        data: heroes = [],
        // isFetching,
        isLoading,
        // isSuccess,
        isError,
        // error
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter=useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() =>{
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter)
        }
    }, [heroes, activeFilter]);
    
    // const filteredHeroes = useSelector(filteredHeroesSelector);
    // const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    // const dispatch = useDispatch();
    // const {request} = useHttp();

    // useEffect(() => {
    //     dispatch(heroesFetching);
    //     request("http://localhost:3001/heroes")
    //         .then(data => dispatch(heroesFetched(data)))
    //         .catch(() => dispatch(heroesFetchingError()))

    //     // eslint-disable-next-line
    // }, []);

    // useEffect(() => {
    //     // dispatch(fetchHeroes(request));
    //     dispatch(fetchHeroes());
    //      // eslint-disable-next-line
    // }, []);    

    const onDelete = useCallback(
        (id) => {
            // Udalenie personazha po ego id
            // request(`http://localhost:3001/heroes/${id}`, "DELETE")
            //     .then(data => console.log(data, 'Deleted'))
            //     .then(dispatch(heroDeleted(id)))
            //     .catch(err => console.log(err));
            deleteHero(id);
            // eslint-disable-next-line  
            
    // }, [request]);
}, []);    

    // if (heroesLoadingStatus === "loading") {
    if (isLoading) {        
        return <Spinner/>;
    // } else if (heroesLoadingStatus === "error") {
    } else if (isError) {        
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

// const elements = renderHeroesList(filteredHeroes);
// const elements = renderHeroesList(heroes);
const elements = renderHeroesList(filteredHeroes);

    return (
        <TransitionGroup component="ul">      
            {elements}
        </TransitionGroup>          
    )
}

export default HeroesList;