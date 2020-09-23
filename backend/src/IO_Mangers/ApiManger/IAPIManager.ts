export default interface IAPIManager 
{
	close(): void;
	getApp(): any;

	addRoute(method:string, path: string, functionToCall: (req: any, res: any) => void );
}
