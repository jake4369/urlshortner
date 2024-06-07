const URL = require("url").URL;
const ShortUniqueId = require("short-unique-id");

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
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const short_url = randomUUID();

    const urlDoc = {
      original_url,
      short_url,
    };

    res.status(201).json(urlDoc);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
