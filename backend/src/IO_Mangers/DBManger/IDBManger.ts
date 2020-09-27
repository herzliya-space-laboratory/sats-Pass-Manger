import ISatellitesDBManger from './ISatellitesDBManger';
import IPassesDBManger from './IPassesDBManger';

export default interface IDBManager extends ISatellitesDBManger, IPassesDBManger
{
	connect(URI): void;
}
