const URL = require("url").URL;
const ShortUniqueId = require("short-unique-id");
const UrlDoc = require("./../models/urlDocModel");

const validateUrl = (input) => {
  try {
    const url = new URL(input);
    const isValidProtocol =
      url.protocol === "http:" || url.protocol === "https:";
    const isValidHostname = url.hostname && url.hostname.includes(".");
    return isValidProtocol && isValidHostname;
  } catch (error) {
    return false;
  }
};

exports.shortenUrl = async (req, res) => {
  const original_url = req.body.url;

  if (!validateUrl(original_url)) {
    return res.json({
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

    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      const urlDoc = await UrlDoc.findOne({
        original_url: req.body.url,
      }).select("-_id -__v");

      return res.json(urlDoc);
    }

    res.json({
      error: error.message,
    });
  }
};

exports.redirectToOriginalUrl = async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;

    const urlDoc = await UrlDoc.findOne({ short_url: shortUrl });

    if (!urlDoc) {
      return res.json({ error: "URL not found" });
    }

    const originalUrl = urlDoc.original_url;

    res.redirect(originalUrl);
  } catch (error) {
    res.json({ error: error.message });
  }
};
