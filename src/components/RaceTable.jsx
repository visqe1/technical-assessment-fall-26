import { useState, useEffect } from 'react'
import './RaceTable.css'

function RaceTable() {
    const [races, setRaces] = useState([])

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
                    />
                </div>
            </div>
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
                    {races.map((race) => (
                        race.Results.map((result, index) => (
                            <tr key={`${race.round}-${index}`}>
                                <td>{race.round}</td>
                                <td className="td-gp">{race.raceName}</td>
                                <td>{race.Circuit.circuitName}</td>
                                <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                                <td>{result.grid}</td>
                                <td><span className={`chip ${getChipClass(result.position)}`}>{result.position}</span></td>
                                <td>{result.points}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RaceTable