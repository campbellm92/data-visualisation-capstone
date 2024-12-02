require("dotenv").config();
var express = require("express");
var router = express.Router();
const authorization = require("../middleware/authorization");

const llm = "o1-mini"; // 'o1-preview'; //'gpt-4o-mini';  //'o1-mini';// 'gpt-4o-mini'; //'gpt-4-turbo'; //'gpt-4o-mini'; //'o1-preview';
const llmUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = process.env.LLM_API_KEY;

const gResponseCache = new Array();

function getResponseFromCache(url) {
  return gResponseCache[url];
}

function putResponseIntoCache(url, value) {
  gResponseCache[url] = value;
}

async function queryLLM(url, llm, prompt) {
  const body = {
    model: llm,
    messages: [
      {
        role: "user",
        content: "you are a data scientist",
      },
      {
        role: "user",
        content: "Always in a response of less than 400 words - " + prompt,
      },
    ],
  };

  if (getResponseFromCache(prompt) === undefined) {
    console.log("getting LLM response from server");

    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        try {
          if (result.choices) {
            console.table(result.choices); //result.choices[0].message.content);
            console.table(result.choices[0].message); //result.choices[0].message.content);
            console.table(result.choices[0].message.content); //result.choices[0].message.content);
          } else {
            console.table(result);

            if (result.error.code === "invalid_api_key") {
              throw Error(
                "Error: Please contact your system administrator to have your API key configured."
              );
            } else {
              throw Error(result.error.message);
            }
          }
        } catch (error) {
          console.table(result);
          console.log(`${error.message}`);
          return error.message;
        }

        putResponseIntoCache(prompt, result.choices[0].message.content);
        return result.choices[0].message.content;
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        throw error;
      });
  } else {
    console.log("getting LLM response from cache");

    return getResponseFromCache(prompt);
  }
}

// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.post("/api/ai/query_llm", function (req, res, next) {
  const prompt = req.body.prompt + " " + req.body.data;

  queryLLM(llmUrl, llm, prompt)
    .then((response) => {
      res.json({ Error: false, Message: "Success", response: response });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error - " + JSON.stringify(err) });
    });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/combined_data", function (req, res, next) {
  if (getResponseFromCache(req.url) === undefined) {
    req.db
      .from("combined_data")
      .select(
        "sample_date",
        "lga_name",
        "average_historical_occupancy",
        "average_daily_rate",
        "average_length_of_stay",
        "average_booking_window"
      )
      .modify((qb) => {
        if (req.query.LGAName !== undefined) {
          qb.where("lga_name", "=", req.query.LGAName);
        }
        if (req.query.start !== undefined) {
          qb.where("sample_date", ">=", req.query.start);
        }
        if (req.query.end !== undefined) {
          qb.where("sample_date", "<=", req.query.end);
        }
      })
      .orderBy("sample_date", "lga_name")
      .then((rows) => {
        putResponseIntoCache(req.url, rows);
        res.json({ Error: false, Message: "Success", combined_data: rows });
      })
      .catch((err) => {
        console.log(err);
        res.json({ Error: true, Message: "Error - " + err.sqlMessage });
      });
  } else {
    res.json({
      Error: false,
      Message: "Success",
      combined_data: getResponseFromCache(req.url),
    });
  }
});

router.get("/api/length_of_stay", function (req, res, next) {
  req.db
    .from("length_of_stay")
    .select(
      "sample_date",
      "lga_name",
      "average_length_of_stay",
      "average_booking_window"
    )
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
    .select(
      "sample_date",
      "lga_name",
      "average_historical_occupancy",
      "average_daily_rate"
    )
    .then((rows) => {
      res.json({
        Error: false,
        Message: "Success",
        occupancy_daily_rate: rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: true, Message: "Error - " + err.sqlMessage });
    });
});

router.get("/api/combined_data/:LGAName", function (req, res, next) {
  console.log(`start[${req.query.start}] end[${req.query.end}]`);

  req.db
    .from("combined_data")
    .select(
      "sample_date",
      "lga_name",
      "average_historical_occupancy",
      "average_daily_rate",
      "average_length_of_stay",
      "average_booking_window"
    )
    .where("lga_name", "=", req.params.LGAName)
    .modify((qb) => {
      if (req.query.start !== undefined) {
        qb.where("sample_date", ">=", req.query.start);
      }
      if (req.query.end !== undefined) {
        qb.where("sample_date", "<=", req.query.end);
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

router.get("/api/spend_data", function (req, res, next) {
  console.log("LGA " + req.query.LGAName);
  console.log("Start " + req.query.start);
  console.log("End " + req.query.end);

  if (getResponseFromCache(req.url) === undefined) {
    console.log("not hitting cache");
    req.db
      .from("spend_data")
      .select(
        "week_commencing",
        "lga_name",
        "category",
        "spend",
        "cards_seen",
        "no_txns"
      )
      .modify((qb) => {
        if (req.query.LGAName !== undefined) {
          qb.where("lga_name", "=", req.query.LGAName);
        }
        if (req.query.start !== undefined) {
          qb.where("week_commencing", ">=", req.query.start);
        }
        if (req.query.end !== undefined) {
          qb.where("week_commencing", "<=", req.query.end);
        }
      })
      .orderBy("week_commencing", "lga_name")
      .then((rows) => {
        console.log(rows);
        putResponseIntoCache(req.url, rows);
        res.json({ Error: false, Message: "Success1", combined_data: rows });
      })
      .catch((err) => {
        console.log(err);
        res.json({ Error: true, Message: "Error2 - " + err.sqlMessage });
      });
  } else {
    console.log("YES hitting cache");
    res.json({
      Error: false,
      Message: "Success3",
      combined_data: getResponseFromCache(req.url),
    });
  }
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
