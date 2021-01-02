import IValidetor from './IValidetor';

export default class passValidetor implements IValidetor
{
    public validateUpdate(dataToValidate)
    {
        if(dataToValidate.goal == undefined || dataToValidate.goal == '') return false;
        return true;
    }

    public static validatePostPassUpdate(PassToValidate)
    {
        if(PassToValidate.whatWasExecute == undefined || PassToValidate.whatWasExecute == '') return false;
        return true;
    }
}