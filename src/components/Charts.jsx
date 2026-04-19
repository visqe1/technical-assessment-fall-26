import './Charts.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line} from 'recharts'

function Charts() {
    // hardcoded data for charts
    const pointsByYear = [
        { year: '2019', points: 504 },
        { year: '2020', points: 131 },
        { year: '2021', points: 292 },
        { year: '2022', points: 554 },
        { year: '2023', points: 406 },
        { year: '2024', points: 652 },
    ]

    const winsByYear = [
        { year: '2019', wins: 3 },
        { year: '2020', wins: 0 },
        { year: '2021', wins: 1 },
        { year: '2022', wins: 4 },
        { year: '2023', wins: 1 },
        { year: '2024', wins: 5 },
    ]

    return (
        <div className="analytics-section">
            <div className="an-head">
                <div className="an-eyebrow">Points · Wins · Season Breakdown</div>
                <div className="an-h2">Constructor <span className="red">Analytics</span></div>
            </div>
            <div className="charts-grid">
                <div className="chart chart-bar">
                    <div className="chart-head">
                        <div className="chart-eyebrow">Constructor Points</div>
                        <div className="chart-title">Points by <span className="red">Season</span></div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={pointsByYear}>
                            <XAxis dataKey="year" />
                            <Bar dataKey="points" fill="#E8000D" label={{ position: 'top', fontSize: 11 }}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart chart-line">
                    <div className="chart-head">
                        <div className="chart-eyebrow">Race Victories</div>
                        <div className="chart-title">Wins per <span className="red">Year</span></div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={winsByYear}>
                            <XAxis dataKey="year" />
                            <Line type="linear" dataKey="wins" stroke="#C8A96E" dot={{ fill: "#C8A96E"}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Charts