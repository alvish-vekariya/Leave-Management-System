import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './inversify config/inversify.config';
import express from 'express';
import cors from 'cors';
import './controllers'
import config from 'config';
import { DBconnection } from './db/db.connection';

const server = new InversifyExpressServer(container);
server.setConfig(app=>{
    app.use(express.json());
    app.use(cors({
        origin : "http://localhost:4200/",
        credentials : true
    }))
})

const app = server.build();

app.listen(config.get("PORT") as number, ()=>{
    console.log(`Server is Connnected on ${config.get("PORT")} !!`);
    try{
        DBconnection().then(()=> console.log('Database is connected!!'))
    }catch(err: any){
        console.log(err.message);
    }
})