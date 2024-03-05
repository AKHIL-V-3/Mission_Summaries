const { Pool } = require('pg');
require('dotenv').config();


// Configure the database connection
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'mission_details',
  password: process.env.DB_PASSWORD,
  port: 5433,
});


const createSchemaQueries = [
`CREATE TABLE IF NOT EXISTS mission_summaries (
  id SERIAL PRIMARY KEY,
  pilot_id INT,
  mission_uuid VARCHAR(100),
  drone_code VARCHAR(100),
  drone_uin VARCHAR(100),
  drone_uuid VARCHAR(100),
  plan VARCHAR(100),
  mission_height FLOAT,
  boundary_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NULL,
  edited_at TIMESTAMP DEFAULT NULL,
  pilot_name VARCHAR(100),
  mission_started_at TIMESTAMP DEFAULT NULL,
  mission_ended_at TIMESTAMP DEFAULT NULL,
  take_off_location POINT DEFAULT NULL,
  clearance_height FLOAT,
  payload_at_start FLOAT,
  payload_at_end FLOAT,
  battery_capacity_at_start FLOAT,
  battery_capacity_at_end FLOAT,
  area_sprayed_at_start FLOAT,
  area_sprayed_at_end FLOAT,
  flight_time FLOAT,
  battery_sn_one VARCHAR(100),
  battery_sn_two VARCHAR(100),
  arm_cycle INT,
  other JSONB DEFAULT NULL ,
  units JSONB,
  warnings JSONB DEFAULT NULL
  )`,
];

// take_off_location GEOMETRY(POINT, 4326),

(async () => {
  const client = await pool.connect();
  try {
    for (const query of createSchemaQueries) {
      await client.query(query);
    }
    console.log('Schema created successfully');
  } catch (err) {
    console.error('Error creating schema:', err);
  } finally {
    client.release();
  }
})();

module.exports = pool
