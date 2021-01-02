import IValidetor from './IValidetor';

export default class passValidetor implements IValidetor
{
    public validateUpdate(dataToValidate)
    {
        return true;
    }
}