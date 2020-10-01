import ISatellitesDBManger from './ISatellitesDBManger';
import IPassesDBManger from './IPassesDBManger';

export default interface IDBManager
{
	connect(URI): void;
}
