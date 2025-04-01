const dotenv = require('dotenv');
dotenv.config();

if (!process.env.REACT_APP_API_URL) {
    console.log(process.env.REACT_APP_API_URL)
    console.error('Error: REACT_APP_API_URL is not defined. Building has failed!');
    process.exit(1);
}
else {
    console.log('REACT_APP_API_URL has been found: ' + process.env.REACT_APP_BASE_URL);
    console.log('Building was succesful!');
}