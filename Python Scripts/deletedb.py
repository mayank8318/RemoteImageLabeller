from dbconfig import getDB, DBInfo

db = getDB()
config = DBInfo()
# print(db)


cursor = db.cursor()

print ("Deleting the database...")
cursor.execute('DROP DATABASE ' + config['database'])
cursor.execute("SHOW DATABASES")
print ("Printing all the databases...")

for x in cursor:
  print(x)

db.close()