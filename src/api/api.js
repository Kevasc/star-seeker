export const getDepartures = async () => {
  // new function using async
  try {
    const response = await fetch(
      // awaiting for promise to resolve
      "https://hstc-api.testing.keyholding.com/gates", // address we want the info from
      {
        method: "GET",
        headers: {
          "x-api-key": "94962B9A-966C-43FC-8E1A-145DEAA5970C", // permission to send to the api to unlock the endpoint
        },
      }
    );
    if (!response.ok) {
      throw new Error("Request failed!");
      //things that are thrown need to be catched
      //if response is not ok, go to line 21 to catch the error
    }
    const data = await response.json(); //response will turn into json[object array]
    return data;
  } catch (error) {
    // catching what line 15 threw
    console.error("Error fetching data:", error); // if error fails then will not run again until page is refreshed
  }
};

export const transportCost = async (fromAirport, toAirport) => {
  // new function using async
  try {
    const response = await fetch(
      // awaiting for promise to resolve
      `https://hstc-api.testing.keyholding.com/gates/${fromAirport}/to/${toAirport}`, // address we want the info from
      {
        method: "GET",
        headers: {
          "x-api-key": "94962B9A-966C-43FC-8E1A-145DEAA5970C", // permission to send to the api to unlock the endpoint
        },
      }
    );
    if (!response.ok) {
      throw new Error("Cost Request failed!");
      //things that are thrown need to be catched
      //if response is not ok, go to line 47 to catch the error
    }
    const data = await response.json(); //response will turn into json[object array]
    return data;
  } catch (error) {
    // catching what line 41 threw
    console.error("Error fetching data:", error); // if error fails then will not run again until page is refreshed
  }
};
