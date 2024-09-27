const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || 'vOp0iaza#xn6egFUQeVZ6LAyX9HlqfjircGnzIRxKI3S_nWv4AH0', // Enter Your Session ID
    MONGODB: process.env.MONGODB || '',    // Enter Your MongoDB URL
    Owner: process.env.OwnerNumber || '94702481115',    // Enter Your Owner Number
    BotNumber: process.env.BotNumber || '94724826875'    // Enter Your Bot Number
};
