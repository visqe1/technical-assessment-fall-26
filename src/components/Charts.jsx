import './Charts.css'
import { BarChart, Bar, XAxis, ComposedChart, Area, ResponsiveContainer, Line, CartesianGrid} from 'recharts'

function Charts() {
    // hardcoded data for charts
    const pointsByYear = [
        { year: '2019', points: 504 },
        { year: '2020', points: 131 },
        { year: '2021', points: 292 },
        { year: '2022', points: 554 },
        { year: '2023', points: 406 },
        { year: '2024', points: 646 },
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
        <div className="analytics-section" id="charts">
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
                            <XAxis dataKey="year" tick={{ fontFamily: 'DM MONO', fontSize: 11, fill: '#444' }} tickLine={false}/>
                            <Bar dataKey="points" fill="#b00d0dff" label={{ position: 'top', fontSize: 9, fill: '#666', fontFamily: 'DM Mono'}} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart chart-line">
                    <div className="chart-head">
                        <div className="chart-eyebrow">Race Victories</div>
                        <div className="chart-title">Wins per <span className="gold">Year</span></div>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <ComposedChart data={winsByYear}  margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                            {/* definition for gradient to fill area under line */}
                            <defs>
                                <linearGradient id="winsGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#C8A96E" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#C8A96E" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="" stroke="rgba(255,255,255,0.04)" vertical={false} />
                            <XAxis dataKey="year" tickMargin={15} tick={{fontFamily: 'DM Mono', fontSize: 11, fill: '#444' }} axisLine={false} tickLine={false} />
                            <Area type="linear" dataKey="wins" stroke="none" fill="url(#winsGradient)"  />
                            <Line type="linear" dataKey="wins" stroke="#C8A96E" dot={{ fill: "#C8A96E", r: 2}} strokeWidth={2}/>
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Charts