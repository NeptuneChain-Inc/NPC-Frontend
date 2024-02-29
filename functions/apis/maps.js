const axios = require('axios');
const app = express();

const getMapsAPI = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/js?key=${process.env.GoogleMaps_API_KEY}`);
      res.send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from Google Maps API');
    }
  }
