// const URL = require("url").URL;
const urlparser = require("url");
const dns = require("dns");
const ShortUniqueId = require("short-unique-id");
const UrlDoc = require("./../models/urlDocModel");

// try {
//   const url = new URL(input);
//   const isValidProtocol =
//     url.protocol === "http:" || url.protocol === "https:";
//   const isValidHostname = url.hostname && url.hostname.includes(".");
//   return isValidProtocol && isValidHostname;
// } catch (error) {
//   return false;
// }

// const validateUrl = async (url) => {
//   const regex = /^https?:\/\//;

//   if (!regex.test(url)) {
//     return false;
//   }

//   let formattedUrl = url.replace(regex, "");
//   formattedUrl = formattedUrl.replace(/\/$/, "");

//   return new Promise((resolve, reject) => {
//     dns.lookup(formattedUrl, (err) => {
//       if (err) {
//         resolve(false);
//       } else {
//         resolve(true);
//       }
//     });
//   });
// };

exports.shortenUrl = async (req, res) => {
  const original_url = req.body.url;

  const dnsLookup = dns.lookup(
    urlparser.parse(original_url).hostname,
    async (err, address) => {
      if (!address) {
        res.status(400).json({
          error: "invalid url",
        });
      } else {
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
      }
    }
  );

  // if (!isValid) {
  //   return res.status(400).json({
  //     error: "invalid url",
  //   });
  // }
};

exports.redirectToOriginalUrl = async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;

    const urlDoc = await UrlDoc.findOne({ short_url: shortUrl });

    if (!urlDoc) {
      return res.status(404).json({ error: "URL not found" });
    }

    const originalUrl = urlDoc.original_url;

    res.status(302).redirect(originalUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
