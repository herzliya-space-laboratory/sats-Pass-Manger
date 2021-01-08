export default interface IValidetor
{
    validateUpdate(dataToValidate);
    validateDelete(dataToValidate);
    validateGetAll(dataToValidate);
    validateGetById(dataToValidate);
    validateFindOne(dataToValidate);
    validateCreate(dataToValidate);

}