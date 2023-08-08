import 'dotenv/config';
import express, { Application } from 'express';
import router from '../api/routes/index';

export const modules = (app: Application): void => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static('public'));
    app.use(router);
    
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');
};
