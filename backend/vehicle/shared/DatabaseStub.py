class DatabaseStub:
    state = True

    def execute(self, query, data):
        return self.state

    def connect(self):
        pass

    def select(self, query, data):
        return self.state
