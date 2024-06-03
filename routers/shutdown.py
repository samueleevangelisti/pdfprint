'''
shutdown.py
This module is from samueva97.
Do not modify it
'''
from threading import Thread
import time
import flask

from utils import logs
from utils import processes



router = flask.Blueprint('shutdown', __name__)



def _terminate_process():
    logs.warning('_terminate_process')
    time.sleep(1)
    processes.kill_process()



@router.route('', methods=['POST'])
def post_shutdown():
    '''
    post_shutdown()
    '''
    logs.warning('post_shutdown')
    Thread(target=_terminate_process).start()
    return {
        'success': True
    }
