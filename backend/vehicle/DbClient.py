import psycopg2
import logging
import os

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class DbClient:

    def __init__(self):
        self.connection = None
        self.db_name = os.environ['DB_NAME']
        self.username = os.environ['USERNAME']
        self.password = os.environ['PASSWORD']
        self.hostname = os.environ['HOSTNAME']
        self.port = os.environ['PORT']

    def connect(self):
        try:
            connection = psycopg2.connect(user=self.username,
                                          password=self.password,
                                          host=self.hostname,
                                          port=self.port,
                                          database=self.db_name)
            self.connection = connection
            logger.info("Connection to PostgreSQL successful")
        except (Exception, psycopg2.Error) as error:
            raise error

    def select(self, query, params):
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

        except (Exception, psycopg2.Error) as error:
            logging.exception("Error while fetching data from PostgreSQL", error)

        finally:
            if self.connection:
                cursor.close()
                self.connection.close()
                logging.info("PostgreSQL connection is closed")

    def execute(self, query, params):
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

        except (Exception, psycopg2.Error) as error:
            logging.exception("Error while fetching data from PostgreSQL", error)

        finally:
            if self.connection:
                cursor.close()
                self.connection.close()
                logging.info("PostgreSQL connection is closed")
