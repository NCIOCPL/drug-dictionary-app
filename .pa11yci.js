// Starting with Ubuntu 22.04, pa11y-ci requires us to tell it the Chrome binary's path
// Fortunately, GitHub Actions has an environment variable for that.
// The rest of this is so we don't break local development on Macs.
// According to the (current) docs, this can all go away once we upgrade pa11y-ci to 4.0 .
const defaultChromeLaunchConfig = {
	args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
};
const chromeLaunchConfig = process.env.CHROME_BIN
	? { executablePath: process.env.CHROME_BIN, ...defaultChromeLaunchConfig }
	: defaultChromeLaunchConfig;

module.exports = {
  urls: [
    "http://localhost:3000",
    "http://localhost:3000/def/bevacizumab",
    "http://localhost:3000/def/tretinoin",
    "http://localhost:3000/def/acenocoumarol",
    "http://localhost:3000/def/xenogeneic-tyrosinase-dna-vaccine",
    "http://localhost:3000/expand/A",
    "http://localhost:3000/def/dsadasda",
    "http://localhost:3000/search/bev/?searchMode=Begins"
  ],
  chromeLaunchConfig: chromeLaunchConfig
}
