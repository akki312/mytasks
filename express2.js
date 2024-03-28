const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);
app.get('/', (req, res) =>{
    res.send('hello, world!');
});