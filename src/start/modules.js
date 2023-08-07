import 'dotenv/config';
import express from 'express';
import router from '../api/routes/index.js';

export const modules = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static('public'));
    app.use(router);
    
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');
}
