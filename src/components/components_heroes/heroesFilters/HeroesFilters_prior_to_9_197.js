
// Zadacha dlja jetogo komponenta:
// Fil'try dolzhny formirovat'sja na osnovanii zagruzhennyh dannyh
// Fil'try dolzhny otobrazhat' tol'ko nuzhnyh geroev pri vybore
// Aktivnyj fil'tr imeet klass active
// Izmenjat' json-fajl dlja udobstva MOZhNO!
// Predstav'te, chto vy poprosili bjekend-razrabotchika ob jetom

const HeroesFilters = () => {
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Otfil'trujte geroev po jelementam</p>
                <div className="btn-group">
                    <button className="btn btn-outline-dark active">Vse</button>
                    <button className="btn btn-danger">Ogon'</button>
                    <button className="btn btn-primary">Voda</button>
                    <button className="btn btn-success">Veter</button>
                    <button className="btn btn-secondary">Zemlja</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;