const express = require('express');
const app = express();
app.use(express.json());

let messages = [];

app.post('/send', (req, res) => {
    const { channel, sender, message } = req.body;
    if (channel && message) {
        messages.push({ channel, sender, message, time: Date.now() });
    }
    res.sendStatus(200);
});

app.get('/get/:channel', (req, res) => {
    const channel = req.params.channel;
    const channelMessages = messages.filter(m => m.channel === channel);
    messages = messages.filter(m => m.channel !== channel);
    res.json(channelMessages);
});

app.get('/', (req, res) => res.send('Chat Server is running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
