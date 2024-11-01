require('dotenv').config();
var express = require("express");
var router = express.Router();
const authorization = require("../middleware/authorization");



const llm = 'gpt-4o-mini';  //'o1-mini';// 'gpt-4o-mini'; //'gpt-4-turbo'; //'gpt-4o-mini'; //'o1-preview';
const llmUrl = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.LLM_API_KEY;

const demoPrompt = `can you see any patterns in the following average daily rate data?
date	lga_name	average_daily_rate
1/1/2023	Gold Coast	391.8278
2/1/2023	Gold Coast	387.2607
3/1/2023	Gold Coast	386.5607
4/1/2023	Gold Coast	380.3056
5/1/2023	Gold Coast	381.5207
6/1/2023	Gold Coast	376.1983
7/1/2023	Gold Coast	374.7809
8/1/2023	Gold Coast	361.7114
9/1/2023	Gold Coast	357.9031
10/1/2023	Gold Coast	357.4896
11/1/2023	Gold Coast	356.2818
12/1/2023	Gold Coast	353.8467
13/1/2023	Gold Coast	359.9103
14/1/2023	Gold Coast	358.1403
15/1/2023	Gold Coast	349.232
16/1/2023	Gold Coast	346.4049
17/1/2023	Gold Coast	343.0668
18/1/2023	Gold Coast	346.4894
19/1/2023	Gold Coast	345.4083
20/1/2023	Gold Coast	354.7091
21/1/2023	Gold Coast	353.5422
22/1/2023	Gold Coast	341.0137
23/1/2023	Gold Coast	335.2294
24/1/2023	Gold Coast	332.1403
25/1/2023	Gold Coast	328.0949
26/1/2023	Gold Coast	328.7861
27/1/2023	Gold Coast	333.461
28/1/2023	Gold Coast	328.3863
29/1/2023	Gold Coast	298.813
30/1/2023	Gold Coast	290.3526
31/1/2023	Gold Coast	284.7954
1/2/2023	Gold Coast	272.9081
2/2/2023	Gold Coast	277.845
3/2/2023	Gold Coast	311.3567
4/2/2023	Gold Coast	314.4698
5/2/2023	Gold Coast	283.2981
6/2/2023	Gold Coast	280.708
7/2/2023	Gold Coast	276.2275
8/2/2023	Gold Coast	275.0034
9/2/2023	Gold Coast	276.4569
10/2/2023	Gold Coast	312.1371
11/2/2023	Gold Coast	313.8236
12/2/2023	Gold Coast	283.3877
13/2/2023	Gold Coast	274.7448
14/2/2023	Gold Coast	271.2948
15/2/2023	Gold Coast	274.0116
16/2/2023	Gold Coast	278.602
17/2/2023	Gold Coast	311.5968
18/2/2023	Gold Coast	315.3925
19/2/2023	Gold Coast	279.1495
20/2/2023	Gold Coast	276.7647
21/2/2023	Gold Coast	275.9518
22/2/2023	Gold Coast	276.6731
23/2/2023	Gold Coast	283.3434
24/2/2023	Gold Coast	319.1458
25/2/2023	Gold Coast	324.1092
26/2/2023	Gold Coast	283.6305
27/2/2023	Gold Coast	279.332
28/2/2023	Gold Coast	285.2743
1/3/2023	Gold Coast	282.8221
2/3/2023	Gold Coast	284.2151
3/3/2023	Gold Coast	315.052
4/3/2023	Gold Coast	317.1811
5/3/2023	Gold Coast	280.8451
6/3/2023	Gold Coast	277.8226
7/3/2023	Gold Coast	281.5584
8/3/2023	Gold Coast	281.5218
9/3/2023	Gold Coast	285.6238
10/3/2023	Gold Coast	321.5302
11/3/2023	Gold Coast	328.6916
12/3/2023	Gold Coast	287.945
13/3/2023	Gold Coast	277.9964
14/3/2023	Gold Coast	275.9658
15/3/2023	Gold Coast	277.4822
16/3/2023	Gold Coast	275.118
17/3/2023	Gold Coast	307.7822
18/3/2023	Gold Coast	314.808
19/3/2023	Gold Coast	279.4501
20/3/2023	Gold Coast	277.1109
21/3/2023	Gold Coast	273.1561
22/3/2023	Gold Coast	270.4676
23/3/2023	Gold Coast	274.8681
24/3/2023	Gold Coast	316.1241
25/3/2023	Gold Coast	315.9299
26/3/2023	Gold Coast	274.1603
27/3/2023	Gold Coast	271.1078 `;

async function queryLLM(url, llm, prompt) {

  const body = {
    model: llm,
    messages: [
      {
        'role': 'user',
        'content': 'you are a data scientist'
      },
      {
        'role': 'user',
        'content': prompt
      }
    ]
  };

  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(result => {
      try {
        if (result.choices) {
          console.table(result.choices);//result.choices[0].message.content);
          console.table(result.choices[0].message);//result.choices[0].message.content);
          console.table(result.choices[0].message.content);//result.choices[0].message.content);
        } else {
          console.table(result);

          if (result.error.code === 'invalid_api_key') {
            throw Error('Error: Please contact your system administrator to have your API key configured.');
          } else {
            throw Error(result.error.message);
          }
        }
      } catch (error) {
        console.table(result);
        console.log(`${error.message}`);
        return error.message;
      }
      return (result.choices[0].message.content);
    })
    .catch(error => {
    });

}

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/api/ai/test", function (req, res, next) {

  res.json({ Error: false, Message: "Success", "response": "a response" });

});

router.post("/api/ai/query_llm", function (req, res, next) {

  const prompt = req.body.prompt + " " + req.body.data;

  queryLLM(llmUrl, llm, prompt)
    .then((response) => {
      res.json({ Error: false, Message: "Success", "response": response });
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

