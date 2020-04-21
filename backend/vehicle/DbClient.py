import psycopg2
import logging
import os
from vehicle_errors import DbClientException

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class DbClient:

    def __init__(self, db_name, username, password, hostname, port):
        self.connection = None
        self.db_name = db_name
        self.username = username
        self.password = password
        self.hostname = hostname
        self.port = port

    def connect(self):
        try:
            connection = psycopg2.connect(user=self.username,
                                          password=self.password,
                                          host=self.hostname,
                                          port=self.port,
                                          database=self.db_name)
            self.connection = connection
            logger.info("Connection to PostgreSQL successful")
        except psycopg2.Error:
            raise DbClientException

    def select(self, query, params):
        if self.connection.closed:
            self.connect()
        try:
            cursor = self.connection.cursor()
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            if cursor.rowcount > 0:
                vehicle_records = cursor.fetchall()
                rows = []
                for row in vehicle_records:
                    rows.append(row)
                return rows
            else:
                return None

        except psycopg2.Error:
            logging.exception("Error while fetching data from PostgreSQL")
            raise DbClientException

        finally:
            if self.connection:
                cursor.close()
                self.connection.close()
                logging.info("PostgreSQL connection is closed")

    def execute(self, query, params):
        if self.connection.closed:
            self.connect()
        try:
            cursor = self.connection.cursor()
            cursor.execute(query, params)
            self.connection.commit()
            number_of_rows_affected = cursor.rowcount
            if number_of_rows_affected:
                logging.info(f"{number_of_rows_affected} rows affected")
                return number_of_rows_affected
            else:
                return None

        except psycopg2.Error:
            logging.exception("Error while fetching data from PostgreSQL")
            raise DbClientException

        finally:
            if self.connection:
                cursor.close()
                self.connection.close()
                logging.info("PostgreSQL connection is closed")
