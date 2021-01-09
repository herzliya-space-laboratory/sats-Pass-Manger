import CRUDLogic from '../src/business logic/CRUDUseCases';
import passLogic from '../src/business logic/passesUseCases';

import PassesDBManger from '../src/IO_Mangers/DBManger/mongoDB/PassesDBManger';
import SatellitesDBManger from '../src/IO_Mangers/DBManger/mongoDB/SatellitesDBManger';

import ConcreteMediators from '../src/Mediator/ConcreteMediators';

import IValidetor from '../src/validetors/IValidetor';
import IDBManger from '../src/IO_Mangers/DBManger/intrface/IDBManger';

import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";

import PassValidetor from '../src/validetors/passValidetor';
import SatelliteValidetor from '../src/validetors/satelliteValidetor';



let satelliteManger:CRUDLogic;
let passManger:CRUDLogic;
let passFinder:passLogic;



let passDB:IDBManger;
let satDB:IDBManger;

let passValidetor:IValidetor;
let satelliteValidetor:IValidetor;

let mediator;

let mongoServer: MongoMemoryServer;

let meditor;

beforeEach(async () => {
    mongoServer = new MongoMemoryServer();

    
	const mongoUri = await mongoServer.getUri();

    passValidetor = new PassValidetor();
    satelliteValidetor = new SatelliteValidetor();

    satDB = new SatellitesDBManger();
    passDB = new PassesDBManger();

    await satDB.connect(mongoUri);

    satelliteManger = new CRUDLogic(satDB, satelliteValidetor);
    passManger = new CRUDLogic(passDB, passValidetor);
    passFinder = new passLogic();
    
     meditor = new ConcreteMediators(passManger, satelliteManger, passFinder); 
    satelliteManger.setMediator(meditor);
    passManger.setMediator(meditor);
})


afterEach(() => {
    return mongoose.disconnect();
})


describe('mediiator tests', () => {
    test('get satellite return it', async () => {
        const _id = new  mongoose.Types.ObjectId();
        const testSatellite = {
            _id,
            name: "test",
            satId: 5
        }

        await satDB.create(testSatellite);

        const resSatellite = await meditor.notify(_id, 'getSatellite');

        Object.keys(testSatellite).forEach(key => expect(testSatellite[key]).toEqual(resSatellite[key]));
    })    

    test('get all satellites return them', async () => {
        const testSatellites =
        [ 
            {
                name: "test 1",
                satId: 1
            },
            {
                name: "test 2",
                satId: 2
            }
        ]

        await satDB.create(testSatellites);

        let resSatellite = await meditor.notify(null, 'getAllSatellites');
        
        resSatellite = resSatellite.sort((a, b) => a.satId - b.satId);
            
        testSatellites.forEach( (testSatellite, i) => {
                Object.keys(testSatellite).forEach(key => expect(testSatellite[key]).toEqual(resSatellite[i][key]));
            } )
    })    

    test("get newist pass time return newist pass", async () => {
        const _id = new  mongoose.Types.ObjectId();
        const testSatellite = {
            _id,
            name: "test",
            satId: 5
        }

        await satDB.create(testSatellite);

        const testPass = [
            {
                Satellite: _id,
                maxElevation: 1,
                startTime: new Date()
            },
            {
                Satellite: _id,
                maxElevation: 2,
                startTime: new Date(0)
            }
        ]
        await passDB.create(testPass);

        const newistPassTime = await meditor.notify(_id, 'getNewistPassTime');

        expect(newistPassTime).toEqual(testPass[0].startTime);
    })

    test("save pass", async () => {
        const _id = new  mongoose.Types.ObjectId();
        const testSatellite = {
            _id,
            name: "test",
            satId: 5
        }

        await satDB.create(testSatellite);

        const testPass = [
            {
                Satellite: _id,
                maxElevation: 1,
                startTime: new Date()
            },
            {
                Satellite: _id,
                maxElevation: 2,
                startTime: new Date(0)
            }
        ]

        await meditor.notify(testPass, 'newPassWasFount');

        const resPasses = await passDB.getAll();
        
        expect(resPasses.length).toBe(testPass.length);
    })
})
