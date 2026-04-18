import { useState, useEffect } from 'react'
import './RaceTable.css'

function RaceTable() {
    const [races, setRaces] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        async function fetchRaces() {
            const res = await fetch('https://api.jolpi.ca/ergast/f1/2024/constructors/ferrari/results.json?limit=100');
            const data = await res.json()

            const fetchedRaces = data.MRData.RaceTable.Races
            setRaces(fetchedRaces)
            console.log(fetchedRaces)
        }
        fetchRaces()
    }, [])

    function getChipClass(position) {
        if (position == 1) return 'c1'
        if (position == 2) return 'c2'
        if (position == 3) return 'c3'
        return 'cx'
    }

    const filteredRaces = races.filter(race => {
        race.raceName.toLowerCase().includes(search.toLowerCase()) ||
            race.Circuit.circuitName.toLowerCase().includes(search.toLowerCase()) ||
            race.Results.some(result =>
                (result.Driver.givenName + ' ' + result.Driver.familyName).toLowerCase().includes(search.toLowerCase())
            )
    })


    return (
        <div className="race-section">
            <div className="race-head">
                <div>
                    <div className="race-eyebrow">2024 Season · Constructor Data</div>
                    <div className="race-h2">Race <span className="red">Results</span></div>
                </div>
            </div>
            <div className="controls">
                <div className="search-wrap">
                    <input
                        type="text"
                        placeholder="Search driver, circuit, country..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>RND</th>
                            <th>GRAND PRIX</th>
                            <th>CIRCUIT</th>
                            <th>DRIVER</th>
                            <th>GRID</th>
                            <th>FINISH</th>
                            <th>POINTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* map each race's individual result */}
                        {races.map((race) => (
                            race.Results.filter(individualResult =>
                                // filter out individual results that don't match the search
                                search === '' ||
                                (individualResult.Driver.givenName + ' ' + individualResult.Driver.familyName).toLowerCase().includes(search.toLowerCase()) ||
                                race.raceName.toLowerCase().includes(search.toLowerCase()) ||
                                race.Circuit.circuitName.toLowerCase().includes(search.toLowerCase())
                            )
                                // take the filtered individual results of each Result and give it a table row
                                .map((individualResult, index) => (
                                    <tr key={`${race.round}-${index}`}>
                                        <td>{String(race.round).padStart(2, '0')}</td>
                                        <td className="td-gp">{race.raceName}</td>
                                        <td>{race.Circuit.circuitName}</td>
                                        <td>{individualResult.Driver.givenName} {individualResult.Driver.familyName}</td>
                                        <td>{individualResult.grid}</td>
                                        <td><span className={`chip ${getChipClass(individualResult.position)}`}>{individualResult.position}</span></td>
                                        <td>{individualResult.points}</td>
                                    </tr>
                                ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RaceTable