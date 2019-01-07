// Import express
let express = require('express')
// Initialize the app
let app = express()
// Setup server port
const port = process.env.PORT || 8080
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'))
// Launch app to listen to specified port
app.listen(port, function () {
  console.log('Running Back on port ' + port)
});
