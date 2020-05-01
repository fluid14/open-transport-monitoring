import mysql.connector
import logging

from sql_exceptions import SqlClientException

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class SqlClient:

    def __init__(self, db_name, username, password, hostname, port):
        self.connection = None
        self.db_name = db_name
        self.username = username
        self.password = password
        self.hostname = hostname
        self.port = port

    def connect(self):
        try:
            self.connection = mysql.connector.connect(
                user=self.username,
                password=self.password,
                host=self.hostname,
                port=self.port,
                database=self.db_name
            )
            logger.info("Database connection established")
        except mysql.connector.Error as error:
            logger.error(error.msg)
            raise SqlClientException

    def __reconnect_if_needed(self):
        if not self.connection:
            self.connect()

        if not self.connection.is_connected():
            self.connection.reconnect()
            logger.info('Reconnected to database')

    def __get_cursor(self):
        cursor = self.connection.cursor(dictionary=True, buffered=True)
        return cursor

    def select(self, query, params):
        try:
            self.__reconnect_if_needed()
            cursor = self.__get_cursor()
            cursor.execute(query, params)

            result = []
            for row in cursor:
                result.append(row)

            cursor.close()
            self.connection.close()

            return result

        except mysql.connector.Error as error:
            logger.error(error.msg)
            raise SqlClientException

    def execute(self, query, params):
        try:
            self.__reconnect_if_needed()
            cursor = self.__get_cursor()
            cursor.execute(query, params)
            self.connection.commit()

            number_of_rows_affected = cursor.rowcount
            cursor.close()
            self.connection.close()

            if number_of_rows_affected:
                logging.info(f"{number_of_rows_affected} rows affected")
                return number_of_rows_affected
            else:
                return None

        except mysql.connector.Error as error:
            logger.error(error.msg)
            raise SqlClientException

