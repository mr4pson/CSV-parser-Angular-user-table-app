const { Router } = require('express')
const router = Router()

const csv = require('csv-parser')
const fs = require('fs')

// /parse/data

router.get('/data', async (req, res) => {
    try {
        const results = {
            headers: [],
            values: []
        }

        fs.createReadStream('./parser/data.csv')
            .pipe(csv({ separator: ';' }))
            .on('data', (data) => {
                results.headers.length === 0 ?
                    results.headers = [
                        data[0], data[1], data[2], data[3]
                    ] :
                    results.values.push({
                        id: data[0],
                        name: data[1],
                        surname: data[2],
                        languages: data[3].split(',')
                    })
            })
            .on('end', () => {
                res.json(results)
            });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again...' })
    }
})

module.exports = router