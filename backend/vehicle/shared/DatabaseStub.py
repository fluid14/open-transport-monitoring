class DatabaseStub:
    data = None

    def execute(self, query, data):
        self.data = data
        try:
            #sprawdzenie sytuacji (None,)
            #do poprawy potem bo to beznadziejne
            if any(data):
                print("jestem w try any")
                print(data[0])
                return data[0]
            else:
                print("jestem w try else")
                return None
        except:
            if data:
                print(data)
                print("jestem w except data")
                return data
            else:
                print("jestem w except none")
                return None

    @staticmethod
    def connect():
        return None

    def select(self, query, data):
        return self.data
