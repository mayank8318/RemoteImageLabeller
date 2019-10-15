from dbconfig import getDB, DBInfo
from os import listdir
from os.path import isfile, join

def createDB():
	db = getDB()
	config = DBInfo()
	# print(db)

	cursor = db.cursor()

	print ("Creating the database...")
	cursor.execute('CREATE DATABASE ' + config['database'])
	cursor.execute("SHOW DATABASES")
	print ("Printing all the databases...")

	for x in cursor:
	  print(x)

	print("\nDatabase successfully created")
	cursor.execute("USE " + config['database'])

	print("Creating table Images...")
	cursor.execute("CREATE TABLE `Images` (`name` varchar(100) not null, `labels` varchar(100), `labelled_by` varchar(100), primary key (`name`))")
	print("Table created successfully!")
	print("\nFetching list of files to add to the database")

	filesList = [f for f in listdir(config['folderPath']) if isfile(join(config['folderPath'], f))]

	for f in filesList:
		cursor.execute("INSERT INTO `Images` VALUES(%s, %s, %s)", (f, None, None))
	
	db.commit()
	print("\n")
	print(str(len(filesList)) + " entries pushed successfully!")
	db.close()