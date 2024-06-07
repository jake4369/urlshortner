const URL = require("url").URL;

const validateUrl = (input) => {
  try {
    const url = new URL(input);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
};

exports.shortenUrl = (req, res) => {
  const original_url = req.body.url;

  if (!validateUrl(original_url)) {
    return res.status(400).json({
      error: "invalid url",
    });
  }

  try {
  } catch (error) {}
};
