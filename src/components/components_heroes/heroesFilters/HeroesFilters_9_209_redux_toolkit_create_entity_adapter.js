import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import store from '../../store';

// import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from '../../actions';
// import { fetchFilters } from '../../actions';
import { filtersChanged, fetchFilters, selectAll } from './filtersSlice';
import Spinner from '../spinner/Spinner';

// Zadacha dlja jetogo komponenta:
// Fil'try dolzhny formirovat'sja na osnovanii zagruzhennyh dannyh
// Fil'try dolzhny otobrazhat' tol'ko nuzhnyh geroev pri vybore
// Aktivnyj fil'tr imeet klass active
// Izmenjat' json-fajl dlja udobstva MOZhNO!
// Predstav'te, chto vy poprosili bjekend-razrabotchika ob jetom

const HeroesFilters = () => {
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

        // Zapros na server dlja poluchenija fil'trov i posledovatel'noj smeny sostojanija
        // useEffect(() => {
        //     dispatch(filtersFetching());
        //     request("http://localhost:3001/filters")
        //         .then(data => dispatch(filtersFetched(data)))
        //         .catch(() => dispatch(filtersFetchingError()))
    
        //     // eslint-disable-next-line
        // }, []);

        useEffect(() => {
            dispatch(fetchFilters(request));
            // dispatch(fetchFilters());
            // eslint-disable-next-line
        }, []);
    
        if (filtersLoadingStatus === "loading") {
            return <Spinner/>;
        } else if (filtersLoadingStatus === "error") {
            return <h5 className="text-center mt-5">Oshibka zagruzki</h5>
        }
    
        const renderFilters = (arr) => {
            if (arr.length === 0) {
                return <h5 className="text-center mt-5">Filtry ne najdeny</h5>
            }
    
            // Dannye v json-fajle ja rasshiril klassami i tekstom
            return arr.map(({name, className, label}) => {
    
                // Ispol'zuem biblioteku classnames i formiruem klassy dinamicheski
                const btnClass = classNames('btn', className, {
                    'active': name === activeFilter
                });
                
                return <button 
                            key={name} 
                            id={name} 
                            className={btnClass}
                            // onClick={() => dispatch(activeFilterChanged(name))}
                            onClick={() => dispatch(filtersChanged(name))}
                            >{label}</button>
            })
        }
    
        const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Otfiltrujte geroev po jelementam</p>
                <div className="btn-group">
                    {/* <button className="btn btn-outline-dark active">Vse</button>
                    <button className="btn btn-danger">Ogon'</button>
                    <button className="btn btn-primary">Voda</button>
                    <button className="btn btn-success">Veter</button>
                    <button className="btn btn-secondary">Zemlja</button> */}
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;