from datetime import datetime


def parse_date_to_string(date, date_format):
    formatted_string = date.strftime(date_format)
    return formatted_string
