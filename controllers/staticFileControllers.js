exports.serveStaticFiles = (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
};
