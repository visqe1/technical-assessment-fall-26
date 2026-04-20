import { useState, useEffect } from 'react'
import './RaceTable.css'

function RaceTable() {
    const [races, setRaces] = useState([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        async function fetchRaces() {
            const res = await fetch('http://localhost:5001/api/ferrari');
            const data = await res.json()

            setRaces(data)
        }
        fetchRaces()
    }, [])

    function getChipClass(position) {
        if (position == 1) return 'c1'
        if (position == 2) return 'c2'
        if (position == 3) return 'c3'
        return 'cx'
    }

    const filteredRows = races.filter(row =>
        row.raceName.toLowerCase().includes(search.toLowerCase()) ||
        row.circuitName.toLowerCase().includes(search.toLowerCase()) ||
        row.driverName.toLowerCase().includes(search.toLowerCase())
    )

    const rowsPerPage = 20

    const numPages = Math.ceil(filteredRows.length / rowsPerPage)
    const paginatedRows = filteredRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    return (
        <div className="race-section" id="results">
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
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
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
                        {paginatedRows.map((row, index) => (
                            <tr key={index}>
                                <td>{String(row.round).padStart(2, '0')}</td>
                                <td className="td-gp">{row.raceName}</td>
                                <td>{row.circuitName}</td>
                                <td>{row.driverName}</td>
                                <td>{row.grid}</td>
                                <td><span className={`chip ${getChipClass(row.position)}`}>{row.position}</span></td>
                                <td>{row.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <div className="pg-info">Showing {(currentPage - 1) * rowsPerPage + 1}-{Math.min(filteredRows.length, currentPage * rowsPerPage)} of {filteredRows.length} entries </div>
                <div className="pg-buttons">
                    <button className="pg-button" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>⟪</button>
                    <button className="pg-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>
                    <button className="pg-button" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === (Math.ceil(filteredRows.length / rowsPerPage))}>›</button>
                    <button className="pg-button" onClick={() => setCurrentPage(Math.ceil(filteredRows.length / rowsPerPage))} disabled={currentPage === Math.ceil(filteredRows.length / rowsPerPage)}>⟫</button>
                </div>
            </div>
        </div>
    )
}

export default RaceTable