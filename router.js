const express = require('express')
const router = express.Router()
const db = require("./Connection")




const insertData = {

    "arm_summary": [
        {
            "parameters": [
                {
                    "name": "Pilot Id",
                    "units": "",
                    "value": 1108
                },
                {
                    "name": "Pilot Name",
                    "units": "",
                    "value": "Naveed"
                },
                {
                    "name": "Drone Code",
                    "units": "",
                    "value": "Krishak 1i"
                },
                {
                    "name": "Drone UIN",
                    "units": "",
                    "value": ""
                },
                {
                    "name": "Drone UUID",
                    "units": "",
                    "value": "49c68e1b-7fda-57a8-9a86-89dd83e9cc8a"
                },
                {
                    "name": "Battery SN 1",
                    "units": "",
                    "value": ""
                },
                {
                    "name": "Battery SN 2",
                    "units": "",
                    "value": ""
                },
                {
                    "name": "Mission Start Time",
                    "units": "",
                    "value": "2024-02-15T16:50:26Z"
                },
                {
                    "name": "Mission End Time",
                    "units": "",
                    "value": "2024-02-15T20:02:25Z"
                },
                {
                    "name": "Take-Off Location",
                    "units": "",
                    "value": "13.004354,77.6818555"
                },
                {
                    "name": "Mission Height",
                    "units": "m",
                    "value": 3
                },
                {
                    "name": "Clearance Height",
                    "units": "m",
                    "value": 10
                },
                {
                    "name": "Payload At Start",
                    "units": "ltr",
                    "value": 0
                },
                {
                    "name": "Payload At End",
                    "units": "ltr",
                    "value": 20
                },
                {
                    "name": "Battery Capacity At Start",
                    "units": "mah",
                    "value": 0
                },
                {
                    "name": "Battery Capacity At End",
                    "units": "mah",
                    "value": 10000
                },
                {
                    "name": "Area Sprayed At Start",
                    "units": "sq m",
                    "value": 0
                },
                {
                    "name": "Area Sprayed At End",
                    "units": "sq m",
                    "value": 4000
                },
                {
                    "name": "Flight Time",
                    "units": "secs",
                    "value": 2000
                },
                {
                    "name": "Boundary",
                    "units": "",
                    "value": "Boundary 1"
                },
                {
                    "name": "Plan",
                    "units": "",
                    "value": 1
                },
                {
                    "name": "Warnings",
                    "units": "",
                    "value": []
                },
                {
                    "name": "Arm Cycle",
                    "units": "",
                    "value": 1
                },
                {
                    "name": "Latitude",
                    "units": "",
                    "value": 13.004354
                },
                {
                    "name": "Longitude",
                    "units": "",
                    "value": 77.6818555
                },
                {
                    "name": "Max Height",
                    "units": "m",
                    "value": 10
                },
                {
                    "name": "Max Speed",
                    "units": "m",
                    "value": 8
                },
                {
                    "name": "Dosage",
                    "units": "ltr/acre",
                    "value": 8.0
                },
                {
                    "name": "Flowrate",
                    "units": "ltr/min",
                    "value": 3.0
                },
                {
                    "name": "Droplet Size",
                    "units": "µm",
                    "value": 150.0
                }
            ]
        }
    ]
}


const takeOffLocation = { x: 13.004354, y: 77.6818555 };

const insertedData = [

        1108,
        "Naveed",
        "Krishak 1i",
        "49c68e1b-7fda-57a8-9a86-89dd83e9cc8a",
        "2024-02-15T16:50:26Z",
        "2024-02-15T20:02:25Z",
        `(${takeOffLocation.x}, ${takeOffLocation.y})`,
        3,
        10,
        0,
        20,
        0,
        10000,
        0,
        4000,
        2000,
        1,
        JSON.stringify({warning:[]}),
        1
        
]

router.get('/', (req, res) => {
    res.send("heyyyy")
})


router.post('/adddata', (req, res) => {

    db.query('INSERT INTO mission_summaries (pilot_id,pilot_name, drone_code,drone_uuid,mission_started_at,mission_ended_at, take_off_location,mission_height,clearance_height,payload_at_start,payload_at_end,battery_capacity_at_start,battery_capacity_at_end,area_sprayed_at_start,area_sprayed_at_end,flight_time,arm_cycle,warnings,plan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)', insertedData, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return;
        }
        console.log('Inserted ID:', result.insertId);
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
        res.json(rows);
    });
});



module.exports = router


