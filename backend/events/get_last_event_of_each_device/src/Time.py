import datetime
import math

class Time:

    def get_current_timestamp_in_milis(self):
        timestamp = datetime.datetime.now().timestamp()

        return math.floor(timestamp * 1000)

    def get_timestamp_from_past_by_minutes(self, minutes):
        seconds = minutes * 60 * 1000
        timestamp = self.get_current_timestamp_in_milis()

        return timestamp - seconds
