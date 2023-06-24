'''
shutdown.py
'''
import os
import signal
from threading import Thread
import time
import flask

from utils import logs



router = flask.Blueprint('shutdown', __name__)



def _terminate_process():
    logs.warning('(shutdown._kill_process)')
    time.sleep(3)
    os.kill(os.getpid(), signal.SIGTERM)



@router.route('', methods=['POST'])
def post_shutdown():
    '''
    post_shutdown()
    '''
    logs.warning('(shutdown.post_shutdown)')
    Thread(target=_terminate_process).start()
    return {
        'success': True
    }
