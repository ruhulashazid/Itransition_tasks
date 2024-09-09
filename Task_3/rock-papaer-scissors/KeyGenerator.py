import os

class KeyGenerator:
    @staticmethod
    def generate_key():
        return os.urandom(32)  # 256 bits = 32 bytes
