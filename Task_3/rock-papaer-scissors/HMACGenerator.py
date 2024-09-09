import hmac
import hashlib

class HMACGenerator:
    @staticmethod
    def generate_hmac(key, message):
        return hmac.new(key, message.encode(), hashlib.sha3_256).hexdigest()
