import IValidetor from './IValidetor';

export default class usersValidetor implements IValidetor
{
    validateCreate(dataToValidate: any) {
        throw new Error('Method not implemented.');
    }
    validateDelete(dataToValidate: any) {
        throw new Error('Method not implemented.');
    }
    validateGetAll(dataToValidate: any) {
        throw new Error('Method not implemented.');
    }
    validateGetById(dataToValidate: any) {
        throw new Error('Method not implemented.');
    }
    validateFindOne(dataToValidate: any) {
        throw new Error('Method not implemented.');
    }
    public validateUpdate(dataToValidate)
    {
        throw new Error('Method not implemented.');
    }
}