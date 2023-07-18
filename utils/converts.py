'''
converts.py
'''
import base64



def byte_to_base64(byte):
    '''
    Converts bytes in base64
    '''
    return base64.b64encode(byte).decode()



def base64_to_byte(text):
    '''
    Converts base64 to bytes
    '''
    return base64.b64decode(text.encode())
