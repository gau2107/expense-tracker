module.exports = {
  async rewrites() {
    return [
      {
        source: "/expense/edit/:id",
        destination: "/expense/add"
      }
    ]
  }
}
