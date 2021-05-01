// Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config()

// Discord
const Discord = require('discord.js');
const d_token = process.env.TOKEN;
const d_channel = process.env.CHANNEL;
const client = new Discord.Client();
client.login(d_token);

/**
 * Keeping the bot
 * alive and well.
 */
client.on("ready", () => {
    client.user
        .setPresence({ activity: { name: "🥳" }, status: "online" })
        .catch((e) => console.log(e));
});

app.use(express.json())

/**
 * The /hook route. Processing the Webflow form data
 * and sending it to a specified Discord channel.
 */
app.post('/hook', (req, res) => {
    // Processing the data sent through the form
    const form_name = req.body.data.name;
    const form_email = req.body.data.email;
    const form_message = req.body.data.message;

    // Creating a formatted Discord message
    const form_data = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('New form submission')
	.setURL(process.env.SITE)
	.setAuthor(form_name)
	.setDescription(form_message)
	.setThumbnail('https://cdn.theorg.com/49515591-1fdb-45b7-8816-b490414a41ad_thumb.png')
	.addField('Email', form_email, true)
	.setTimestamp()
	.setFooter('Sent through successfully bois');

    // Sending the message to the channel
    client.channels.cache.get(d_channel).send(form_data)
    .catch((e) => console.log(e));
});

app.listen(PORT, () => { console.log("We're up and running bois") });
