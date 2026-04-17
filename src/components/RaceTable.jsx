import { useState, useEffect } from 'react'

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

    return (
        <table>
            <thead>
                <th>RND</th>
                <th>GRAND PIX</th>
                <th>CIRCUIT</th>
                <th>DRIVER</th>
                <th>GRID</th>
                <th>FINISH</th>
                <th>POINTS</th>
            </thead>
            <tbody>
                {races.map((race) => (
                    race.Results.map((result, index) => (
                        <tr key={`${race.round}-${index}`}>
                            <td>{race.round}</td>
                            <td>{race.raceName}</td>
                            <td>{race.Circuit.circuitName}</td>
                            <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                            <td>{result.grid}</td>
                            <td>{result.position}</td>
                            <td>{result.points}</td>
                        </tr>
                    ))
                ))}
            </tbody>
        </table>
    )
}

export default RaceTable