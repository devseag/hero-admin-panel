import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroCreated } from '../../actions';

// Zadacha dlja jetogo komponenta:
// Realizovat' sozdanie novogo geroja s vvedennymi dannymi. On dolzhen popadat'
// v obshhee sostojanie i otobrazhat'sja v spiske + fil'trovat'sja
// Unikal'nyj identifikator personazha mozhno sgenerirovat' cherez uiid
// Uslozhnennaja zadacha:
// Personazh sozdaetsja i v fajle json pri pomoshhi metoda POST
// Dopolnitel'no:
// Jelementy <option></option> zhelatel'no sformirovat' na baze
// dannyh iz fil'trov

const HeroesAddForm = () => {
    // Sostojanija dlja kontrolja formy
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // Mozhno sdelat' i odinakovye nazvanija sostojanij,
        // Generacija id cherez biblioteku
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }

        // Otpravljaem dannye na server v formate JSON
        // TOL''KO esli zapros uspeshen - otpravljaem personazha v store
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(res => console.log(res, 'Otpravka uspeshna'))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => console.log(err));

        // Ochishhaem formu posle otpravki
        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Zagruzka jelementov</option>
        } else if (status === "error") {
            return <option>Oshibka zagruzki</option>
        }
        
        // Esli fil'try est', to renderim ih
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // Odin iz fil'trov nam tut ne nuzhen
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }


    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Imja novogo geroja</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Kak menja zovut?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Opisanie</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Chto ja umeju?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Vybrat jelement geroja</label>
                 <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    // <option >Ja vladeju jelementom...</option>
                    // <option value="fire">Ogon'</option>
                    // <option value="water">Voda</option>
                    // <option value="wind">Veter</option>
                    // <option value="earth">Zemlja</option> 
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option value="">Ja vladeju jelementom...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Sozdat</button>
        </form>
    )
}

export default HeroesAddForm;