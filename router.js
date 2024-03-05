const express = require('express')
const router = express.Router()
const db = require("./Connection")


router.post('/adddata', (req, res) => {

    const datas = req.body.parameters
    let insertedData = []
    let units = []

    datas.forEach(data => {
        if (data.name === 'Take-Off Location') {
            insertedData.push(`(${parseFloat(data.value.split(',')[0])}, ${parseFloat(data.value.split(',')[1])})`)
            let values = { name: data.name, unit: data.units }
            units.push(values)
            return
        }
        if (data.name === 'Warnings') {
            insertedData.push(JSON.stringify({ warning: data.value }))
            let values = { name: data.name, unit: data.units }
            units.push(values)
            return
        }
        insertedData.push(data.value)
        let values = { name: data.name, unit: data.units }
        units.push(values)
    });

    insertedData.push(JSON.stringify(units))


    db.query('INSERT INTO mission_summaries (pilot_id,pilot_name, drone_code,drone_uuid,mission_started_at,mission_ended_at, take_off_location,mission_height,clearance_height,payload_at_start,payload_at_end,battery_capacity_at_start,battery_capacity_at_end,area_sprayed_at_start,area_sprayed_at_end,flight_time,arm_cycle,warnings,plan,units) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)', insertedData, (err, result) => {
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
        const value = rows.rows[0];
        const {
            pilot_id,
            drone_code,
            drone_uuid,
            plan,
            mission_height,
            pilot_name,
            mission_started_at,
            mission_ended_at,
            take_off_location,
            clearance_height,
            payload_at_start,
            payload_at_end,
            battery_capacity_at_start,
            battery_capacity_at_end,
            area_sprayed_at_start,
            area_sprayed_at_end,
            flight_time,
            arm_cycle,
            units,
            warnings
        } = value;

       let  takeOfLocation = ""
        takeOfLocation  = takeOfLocation + take_off_location.x +','+ take_off_location.y
        let parameters = [

            {
                name: units[0].name,
                units: units[0].unit,
                value: pilot_id
            },

            {
                name: units[1].name,
                units: units[1].unit,
                value: pilot_name
            },

            {
                name: units[2].name,
                units: units[2].unit,
                value: drone_code
            },
            {
                name: units[3].name,
                units: units[3].unit,
                value: drone_uuid
            },
            {
                name: units[4].name,
                units: units[4].unit,
                value: mission_started_at
            },
            {
                name: units[5].name,
                units: units[5].unit,
                value: mission_ended_at
            },
            {
                name: units[6].name,
                units: units[6].unit,
                value: takeOfLocation
            },
            {
                name: units[7].name,
                units: units[7].unit,
                value: mission_height
            },
            {
                name: units[8].name,
                units: units[8].unit,
                value: clearance_height
            },
            {
                name: units[9].name,
                units: units[9].unit,
                value: payload_at_start
            },
            {
                name: units[10].name,
                units: units[10].unit,
                value: payload_at_end
            },
            {
                name: units[11].name,
                units: units[11].unit,
                value: battery_capacity_at_start
            },
            {
                name: units[12].name,
                units: units[12].unit,
                value: battery_capacity_at_end
            },
            {
                name: units[13].name,
                units: units[13].unit,
                value: area_sprayed_at_start
            },
            {
                name: units[14].name,
                units: units[14].unit,
                value: area_sprayed_at_end
            },
            {
                name: units[15].name,
                units: units[15].unit,
                value: flight_time
            },
            {
                name: units[16].name,
                units: units[16].unit,
                value: arm_cycle
            },
            {
                name: units[17].name,
                units: units[17].unit,
                value: warnings.warning
            },
            {
                name: units[18].name,
                units: units[18].unit,
                value: plan
            },

        ]
        const response = {parameters}
        res.status(200).json(response);

    });
});



module.exports = router


