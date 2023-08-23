import mysql.connector

class Database:
    __db = None

    def __new__(self):
        if self.__db is None:
            self.__db = mysql.connector.connect(
                host="eu-cdbr-west-01.cleardb.com",
                user="b7661d429b4c38",
                password="ef309c34",
                database="heroku_b5f761ddd8a2ef8"
            )
        return self.__db

