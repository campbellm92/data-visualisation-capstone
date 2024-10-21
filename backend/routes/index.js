var express = require("express");
var router = express.Router();
const authorization = require("../middleware/authorization");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


router.get("/api/combined_data", function (req, res, next) {
  req.db
    .from("combined_data")
    .select("sample_date", "lga_name", "average_historical_occupancy", "average_daily_rate", "average_length_of_stay", "average_booking_window")
    .modify((qb) => {
      if (req.query.LGAName !== undefined) {
        qb.where("lga_name", "=", req.query.LGAName)
      }
      if (req.query.start !== undefined) {
        qb.where("sample_date", ">=", req.query.start)
      }
      if (req.query.end !== undefined) {
        qb.where("sample_date", "<=", req.query.end)
      }
    })
    .orderBy('sample_date', 'lga_name')
    .then((rows) => {
      res.json({ Error: false, Message: "Success", combined_data: rows });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error - " + err.sqlMessage });
    });
});


router.get("/api/length_of_stay", function (req, res, next) {
  req.db
    .from("length_of_stay")
    .select("sample_date", "lga_name", "average_length_of_stay", "average_booking_window")
    .then((rows) => {
      res.json({ Error: false, Message: "Success", length_of_stay: rows });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error - " + err.sqlMessage });
    });
});

router.get("/api/occupancy_daily_rate", function (req, res, next) {
  req.db
    .from("occupancy_daily_rate")
    .select("sample_date", "lga_name", "average_historical_occupancy", "average_daily_rate")
    .then((rows) => {
      res.json({ Error: false, Message: "Success", occupancy_daily_rate: rows });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error - " + err.sqlMessage });
    });
});

router.get("/api/combined_data/:LGAName", function (req, res, next) {

  console.log(`start[${req.query.start}] end[${req.query.end}]`)

  req.db
    .from("combined_data")
    .select("sample_date", "lga_name", "average_historical_occupancy", "average_daily_rate", "average_length_of_stay", "average_booking_window")
    .where("lga_name", "=", req.params.LGAName)
    .modify((qb) => {
      if (req.query.start !== undefined) {
        qb.where("sample_date", ">=", req.query.start)
      }
      if (req.query.end !== undefined) {
        qb.where("sample_date", "<=", req.query.end)
      }
    })
    
    .then((rows) => {
      res.json({ Error: false, Message: "Success", combined_data: rows });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error - " + err.sqlMessage });
    });

});


/* original module examples below

router.post('/api/update', authorization, (req, res) => {
  if (!req.body.City || !req.body.CountryCode || !req.body.Pop) {
    res.status(400).json({ message: `Error updating population` });
    console.log(`Error on request body:`, JSON.stringify(req.body));

  } else { 
    let filter = { "Name": req.body.City, "CountryCode": req.body.CountryCode };
    req.db('city').where(filter).update( { Population: req.body.Pop })
      .then(_ => {
       res.status(201).json({ message: `Successful update ${req.body.City}`});
       console.log(`successful population update:`, JSON.stringify(filter));
    }).catch(error => {
       res.status(500).json({ message: 'Database error - not updated' });
    })
  } 
});
*/


module.exports = router;

