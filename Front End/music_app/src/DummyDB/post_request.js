const axios = require('axios');

axios.post('http://localhost:3000/artists', {
    id: 6,
    name: "Metallica",
    cover_URL:""
})
.then(resp => {
    console.log(resp.data);
})
.catch(error => {
    console.log(error);
})