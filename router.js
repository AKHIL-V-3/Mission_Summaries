const express = require('express')
const router = express.Router()
const db = require("./Connection")


router.post('/adddata', (req, res) => {

    const datas = req.body.parameters

    let insertedData = []

    datas.forEach(data => {
        if (data.name === 'Take-Off Location') {
            insertedData.push(`(${parseFloat(data.value.split(',')[0])}, ${parseFloat(data.value.split(',')[1])})`)
            return
        }
        if (data.name === 'Warnings') {
            insertedData.push(JSON.stringify({ warning: data.value }))
            return
        }
        insertedData.push(data.value)
    });

    db.query('INSERT INTO mission_summaries (pilot_id,pilot_name, drone_code,drone_uuid,mission_started_at,mission_ended_at, take_off_location,mission_height,clearance_height,payload_at_start,payload_at_end,battery_capacity_at_start,battery_capacity_at_end,area_sprayed_at_start,area_sprayed_at_end,flight_time,arm_cycle,warnings,plan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)', insertedData, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: err });
            return;
        }
        res.status(200).json({ message: "Data Added Successfully" })
    });

})


router.get('/getData', (req, res) => {
    db.query('SELECT * FROM  mission_summaries', (err, rows) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        console.log(rows);
        res.status(200).json(rows);
    });
});



module.exports = router


