const mongoose = require('mongoose');

async function connect()
{
    try {
        await mongoose.connect('mongodb://localhost/msShopData');
        console.log("Connect!");;
    } catch (e) {
        console.log("Not Connect!");
    }
}

module.exports = { connect };