import IMediator from "./IMediator";

import passLogic from "../business logic/passesUseCases";
import satelliteLogic from "../business logic/satelliteUseCases";

export default class ConcreteMediators implements IMediator
{
    private passesManger: passLogic;

    private satellitesManger: satelliteLogic;

    constructor(passesManger: passLogic, satellitesManger: satelliteLogic) 
    {
        this.passesManger = passesManger;
        this.passesManger.setMediator(this);

        this.satellitesManger = satellitesManger;
        this.satellitesManger.setMediator(this);
    }


    public async notify(sender: object, event: string)
    {
        return await this[event](sender);
    }

    private async newPassWasFount(passes)
    {
        return await this.passesManger.createPasses(passes);
    }

    private async getNewistPassTime(sender)
    {
        return (await this.passesManger.getNewistPass()).startTime;
    }

}