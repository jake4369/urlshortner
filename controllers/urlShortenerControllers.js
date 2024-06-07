const URL = require("url").URL;
const ShortUniqueId = require("short-unique-id");
const UrlDoc = require("./../models/urlDocModel");

const validateUrl = (input) => {
  try {
    const url = new URL(input);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
};

exports.shortenUrl = async (req, res) => {
  const original_url = req.body.url;

  if (!validateUrl(original_url)) {
    return res.status(400).json({
      error: "invalid url",
    });
  }

  try {
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const short_url = randomUUID();

    const savedUrlDoc = await UrlDoc.create({
      original_url,
      short_url,
    });

    const result = await UrlDoc.findOne({
      original_url: savedUrlDoc.original_url,
    }).select("-_id -__v");

    res.status(201).json(result);
  } catch (error) {
    if (error.code === 11000) {
      const urlDoc = await UrlDoc.findOne({
        original_url: req.body.url,
      }).select("-_id -__v");

      return res.status(200).json(urlDoc);
    }

    res.status(500).json({
      error: error.message,
    });
  }
};
