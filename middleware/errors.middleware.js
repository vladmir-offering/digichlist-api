module.exports = function (req, res) {
    res.status(404).send(`
        <div>
            <h1>digichlist API</h1>
            <h1>Not found API path</h1>
            <a href='/api-docs'>View API Documentation</a>
        </div>
    `);
};
