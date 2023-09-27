

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
    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Imja novogo geroja</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Kak menja zovut?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Opisanie</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Chto ja umeju?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Vybrat' jelement geroja</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Ja vladeju jelementom...</option>
                    <option value="fire">Ogon'</option>
                    <option value="water">Voda</option>
                    <option value="wind">Veter</option>
                    <option value="earth">Zemlja</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Sozdat'</button>
        </form>
    )
}

export default HeroesAddForm;