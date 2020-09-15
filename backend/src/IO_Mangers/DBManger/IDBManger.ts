import ISatellitesDBManger from './ISatellitesDBManger';

export default interface IDBManager extends ISatellitesDBManger
{
	connect(URI): void;
}
