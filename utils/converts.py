'''
converts.py
This module is from samueva97.
Do not modify it
'''
import base64
import pyzstd



def byte_to_base64(byte):
    '''
    Converts bytes in base64

    Parameters
    ----------
    byte : bytes
        Bytes

    Returns
    -------
    str
    '''
    return base64.b64encode(byte).decode()



def byte_to_urlsafe_base64(byte):
    '''
    Convers bytes in base64 urlsafe

    Parameters
    ----------
    bytes : bytes
        Bytes
    
    Returns
    -------
    str
    '''
    return base64.urlsafe_b64encode(byte).decode()



def base64_to_byte(text):
    '''
    Converts base64 to bytes

    Parameters
    ----------
    text : str
        Text in base64

    Returns
    -------
    bytes
    '''
    return base64.b64decode(text.encode())



def urlsafe_base64_to_byte(text):
    '''
    Converts urlsafe base64 to bytes

    Parameters
    ----------
    text : str
        Text in base64 urlsafe

    Returns
    -------
    bytes
    '''
    return base64.urlsafe_b64decode(text.encode())



def byte_to_zstd(byte):
    '''
    Converts bytes to zstd

    Parameters
    ----------
    byte : bytes
        Bytes

    Returns
    -------
    bytes
    '''
    return pyzstd.compress(byte)



def zstd_to_byte(byte):
    '''
    Converts zstd to bytes

    Parameters
    ----------
    byte : bytes
        Bytest representing a zst file

    Returns
    -------
    bytes
    '''
    return pyzstd.decompress(byte)
