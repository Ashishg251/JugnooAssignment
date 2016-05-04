# JugnooAssignment
Hi Harpreet,

I have used node.js at backend for running the script.

For running the assisgnment use the command "node GoogleMapScript.js".

In this assignmant I have used "request" and "deasync" modules.

As given in the assignment that there is a limit for hitting on number of times for hittting the server hence, it will take around "1 min 20 seconds" for the complete execution of the script.

It will write all the results in "Result.json".

"engagement_data.json" is the file containing all the given 300 records.

"testData.json" is the smaller version of the engagement_data.json file containing only 2 records for the testing purpose.

I have printed the output in the following format:
{
    "engagement_id": 1,
    "metredDistance": 5.7,
    "metredTime": 13,
    "googleMetredDistance": 5.5,
    "googleMetredTime": 12,
    "distanceDeviation": "3.63636363636364 %",
    "timeDeviation": "8.333333333333334 %",
    "Faulty": "False"
  },
where, "metredDistance, metredTime" are given values and "googleMetredDistance, googleMetredTime" are values which I got from the google API.