const app = require('./app')

const port = 8080

app.listen(port, () => {
    console.log(`MyPlayer server is listening on port ${port}...`)
});