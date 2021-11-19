// 載入express模組
import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-Parser';
import month from './controllers/index_Month.js';
import personal from './controllers/index_Personal.js';
import watch from './controllers/index_Watch.js';
import menu from './controllers/index_Menu.js';

var corsOptions = {
    origin: "http://localhost:3000",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// 監聽 port
app.listen(5000, () => console.log('Server running at port 5000'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Request-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/', month);
app.use('/', personal);
app.use('/', watch);
app.use('/', menu);

