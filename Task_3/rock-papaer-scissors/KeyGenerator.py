import os

class KeyGenerator:
    @staticmethod
    def generate_key():
        return os.urandom(32)  