export default class passValidetor
{
    public static validatePrePassUpdate(PassToValidate)
    {
        if(PassToValidate.goal == undefined || PassToValidate.goal == '') return false;
        if(PassToValidate.PassPlanner == undefined || PassToValidate.PassPlanner == '') return false;
        if(PassToValidate.PassExecuter == undefined || PassToValidate.PassExecuter == '') return false;
        return true;
    }

    public static validatePostPassUpdate(PassToValidate)
    {
        if(PassToValidate.whatWasExecute == undefined || PassToValidate.whatWasExecute == '') return false;
        return true;
    }:
}