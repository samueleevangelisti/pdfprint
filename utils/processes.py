'''
processes.py
This module is from samueva97.
Do not modify it
'''
import os
import signal



def get_process_id():
    '''
    Returns the process id
    '''
    return os.getpid()



def get_parent_process_id():
    '''
    Returns the parent process id
    '''
    return os.getppid()



def send_signal(process_id, signal_number):
    '''
    Sends a signal to a process
    '''
    os.kill(process_id, signal_number)



def kill_process():
    '''
    Kills the current process
    '''
    send_signal(get_process_id(), signal.SIGKILL)
