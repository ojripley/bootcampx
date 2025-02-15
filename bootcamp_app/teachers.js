const args = process.argv.slice(2);

const queryValues = [`%${args[0]}%`];

const { Pool } = require('pg');

const pool = new Pool({
  user: 'rips',
  password: 'ripsj',
  host: 'localhost',
  database: 'bootcampx'
});

console.log(queryValues);

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort, count(assistance_requests) as total_assistances
FROM assistance_requests
JOIN teachers on teachers.id = teacher_id
JOIN students on students.id = student_id
JOIN cohorts on cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
GROUP BY teachers.name, cohorts.name
ORDER BY teacher
`, queryValues)
  .then(res => {
    res.rows.forEach(teacher => {
      console.log(`${teacher.cohort}: ${teacher.teacher}`);
    });
  })
  .catch(error => console.error('query error', error.stack));