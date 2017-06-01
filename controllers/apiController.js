function index(req, res) {
  res.json({
    message: "Welcome to trail mix!",
    documentation_url: "https://github.com/kabitachatterjee/trail-mix",
    base_url: "localhost:3000",
    endpoints: [
      {
        method: "GET", path: "/api", description: "Describes available endpoints"
      }
    ]
  });
}

module.exports = {
  index: index
}
