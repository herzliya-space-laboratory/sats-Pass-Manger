import { formatQueryForMoongose } from 'utils/queryFormater';
import satelliteValidetor from '../../src/validetors/satelliteValidetor'; 

import { ObjectId } from 'mongoose';


let validator = new satelliteValidetor();


describe('satellite validetor test, also the defualt validetor behover as the satllite dosent requere any non default validaions', () => {
    test("valid a get all requst return its validated qury", () => {
        const req = {
            query: {}
        }

        expect(req.query).toEqual(validator.validateGetAll(req));
    })

    test("valid get by id requst return its id", () => {
        const req = {
            params: { id: new ObjectId}
        }

        expect({ id: req.params.id, query: undefined }).toEqual(validator.validateGetById(req));
    })

    test("valid delete requst return id", () => {
        const req = {
            params: { id: new ObjectId}
        }

        expect(req.params.id).toEqual(validator.validateDelete(req));
    })

    test("valid create requast return the data to create", () => {
        const req = {
            body: { id: new ObjectId}
        }

        expect(req.body).toEqual(validator.validateCreate(req));
    })

    test("valid a find one requst return its validated qury", () => {
        const req = {
            query: {}
        }

        expect(req.query).toEqual(validator.validateFindOne(req));
    })    

    test("valid update requst return id and data to update", () => {
        const req = {
            params: { id: new ObjectId},
            body: { id: new ObjectId}
        }

        expect({ id: req.params.id, dataToUpdate: req.body}).toEqual(validator.validateUpdate(req));
    })
})
