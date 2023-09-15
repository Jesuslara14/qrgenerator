const exp = require('constants');
const express = require('express');
const fs = require('fs');
const qr = require('qr-image');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate', async (req, res) => {
    try{
        const url = await req.body.url;
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('./public/output.png'));
        res.render('output');
    }catch(error){
        console.error(error.message)
    }
})

app.listen(PORT, () => {
    console.log(`Server now live at port: ${PORT}`);
});
