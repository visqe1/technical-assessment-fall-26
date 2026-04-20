import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// backend configuration

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB error: ', err))

// data models

const raceSchema = new mongoose.Schema({
    season: String,
    round: Number,
    raceName: String,
    circuitName: String,
    date: String,
    driverName: String,
    grid: String,
    position: String,
    points: String
})

const Race = mongoose.model('Race', raceSchema)

// api endpoint

app.get('/api/ferrari', async (req, res) => {
    try {
        const count = await Race.countDocuments()

        if (count === 0) {
            console.log('Fetching from Jolpi...')
            const allRaces = []
            const limit = 100
            let offset = 0
            let total = Infinity

            while (offset < total) {
                const response = await fetch(`https://api.jolpi.ca/ergast/f1/constructors/ferrari/results.json?limit=${limit}&offset=${offset}`)
                const data = await response.json()
                total = parseInt(data.MRData.total)

                for (const race of data.MRData.RaceTable.Races) {
                    for (const result of race.Results) {
                        allRaces.push({
                            season: race.season,
                            round: parseInt(race.round),
                            raceName: race.raceName,
                            circuitName: race.Circuit.circuitName,
                            date: race.date,
                            driverName: result.Driver.givenName + ' ' + result.Driver.familyName,
                            grid: result.grid,
                            position: result.position,
                            points: result.points
                        })
                    }
                }
                offset += limit
                await new Promise(resolve => setTimeout(resolve, 300))
            }

            const sorted = allRaces.sort((a, b) => {
                if (b.season !== a.season) return parseInt(b.season) - parseInt(a.season)
                return b.round - a.round
            })

            await Race.insertMany(sorted)
            console.log(`Saved ${sorted.length} results to MongoDB`)
            res.json(sorted)

        } else {
            const races = await Race.find().sort({ season: -1, round: -1 })
            res.json(races)
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))