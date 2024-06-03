'''
app.py
'''
from threading import Thread
import time
import webbrowser
import flask

from utils import logs
from routers import merge
from routers import split
from routers import shutdown



app = flask.Flask(__name__)



@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
@app.route('/index.html', methods=['GET'])
def get_index():
    '''
    get_index()
    '''
    logs.debug('(app.get_index)')
    return flask.send_file('statics/html/index.html')



@app.route('/statics/<path:path>', methods=['GET'])
def get_statics(path):
    '''
    get_statics(path)
    '''
    logs.debug(f"(app.get_statics) path: {path}")
    return flask.send_from_directory('statics', path)



app.register_blueprint(merge.router, url_prefix='/merge')
app.register_blueprint(split.router, url_prefix='/split')
app.register_blueprint(shutdown.router, url_prefix='/shutdown')



def _browser_start():
    '''
    browser_start()
    '''
    logs.debug('(app.browser_start)')
    time.sleep(1)
    webbrowser.open('http://localhost:8080')



if __name__ == '__main__':
    logs.debug('(app.__main__)')
    Thread(target=_browser_start).start()
    app.run(host='localhost', port=8080, threaded=True)
