import express, { Request, Response, Router } from "express";
// import bodyParser from 'body-parser'; deprecated
const bodyParser = require("body-parser");

import { Car, cars as cars_list } from "./cars";

(async () => {
    const cars: Car[]  = cars_list;

    // Create an express application
    const app = express();
    // default port to listen
    const port = 8082;

    // use middleware so post bodies
    // are accessible as req.body.{{variable}}
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true })); // for requests from forms-like data

    // Root URI call
    app.get( "/", ( req: Request, res: Response ) => {
        res.status(200).send("Welcome to the Cloud!");
    } );

    // Get a greeting to a specific person
    // to demonstrate routing parameters
    // > try it {{host}}/persons/:the_name
    app.get( "/persons/:name",
        ( req: Request, res: Response ) => {
            const { name } = req.params;

            if ( !name ) {
                return res.status(400)
                    .send(`name is required`);
            }

            return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
        } );

    // Get a greeting to a specific person to demonstrate req.query
    // > try it {{host}}/persons?name=the_name
    app.get( "/persons/", ( req: Request, res: Response ) => {
        const { name } = req.query;

        if ( !name ) {
            return res.status(400)
                .send(`name is required`);
        }

        return res.status(200)
            .send(`Welcome to the Cloud, ${name}!`);
    } );

    // Post a greeting to a specific person
    // to demonstrate req.body
    // > try it by posting {"name": "the_name" } as
    // an application/json body to {{host}}/persons
    app.post( "/persons",
        async ( req: Request, res: Response ) => {

            const { name } = req.body;

            if ( !name ) {
                return res.status(400)
                    .send(`name is required`);
            }

            return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
        } );

    // Add an endpoint to GET a list of cars
    // it should be filterable by make with a query parameter
    app.get( "/cars", (req: Request, res: Response ) => {
        const { index } = req.query;

        const processedIndex = Number(index);
        if ( processedIndex >= 0 || processedIndex < cars.length ) {
            return res.status(200).send(cars[processedIndex]);
        }

        res.status(200).send(cars);
    } );

    // Add an endpoint to get a specific car
    // it should require id
    // it should fail gracefully if no matching car is found
    app.get( "/cars/:id", (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            return res.status(400).send(`id no está`);
        }
        cars.forEach(function(car) {
            if (+id == car.id) { return res.status(200).send(car); }
        });
        return res.status(400);
    } );

    // Add an endpoint to post a new car to our list
    // it should require id, type, model, and cost
    app.post("/cars",
        async (req: Request, res: Response) => {
        const { make, type, model, cost, id } = req.body;

        if ( !req.body ) {
            return res.status(400).send(`car is required`);
        }
        cars.push({ make, type, model, cost, id });
        return res.status(201).send(cars);
    } );

    // Start the Server
    app.listen( port, () => {
        console.log( `server running http://localhost:${ port }` );
        console.log( `press CTRL+C to stop server` );
    } );
})();
