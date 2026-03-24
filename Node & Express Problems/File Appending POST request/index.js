// Please do not change the prewritten code

import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  //  Write your code here
  if (req.method == 'POST') {
    let body = "";
    req.on('data', (chunk) => {
      body = body + chunk;
    });

    req.on('end', () => {
      // Append the request body to data.txt
      fs.appendFileSync('data.txt', body);
      
      // Read and print the new content of the file
      const data = fs.readFileSync('data.txt', { encoding: 'utf8' });
      console.log(data);
      
      // Send confirmation response
      res.end("Data received and processed successfully");
    });
    
  } else {
    // For non-POST requests
    res.end("This is not a POST request. Please send a POST request.");
  }
});

export default server;
