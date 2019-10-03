import mysql.connector
import os

def getDB():
	db = mysql.connector.connect(
		host='localhost',
		user='mayank',
		passwd='mayankM1!'
	)

	return db

def DBInfo():
	return ({
		'database':'ImageLabeller',
		'folderPath': os.path.join('C:\\', 'Users', 'mayan', 'BTP', 'Documentations_And_Credentials', 'sample-images')
	})