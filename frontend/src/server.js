
const dotenv = require("dotenv");
dotenv.config({path: './config/config.env'});
const { PORT_TO_USE, NODE_ENV } = process.env;
process.env.PORT = PORT_TO_USE;
const dev = NODE_ENV === 'development';


import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';



const app = express(); 


const FileStore = new sessionFileStore(session);

app.use(
		json(),
		session({
			secret: 'soon',
			resave: true,
			saveUninitialized: true,
			cookie: {
				maxAge: 3600000
			},
			store: new FileStore({
				path: `.sessions`
			})
		}),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => {
			  return ({
				token: req.session.token,
				decodedToken: req.session.decodedToken
			  })}
			})
	);
	
app.listen(PORT_TO_USE, err => {
		if (err) console.log('error', err);
	});
 