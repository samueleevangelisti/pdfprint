'''
merge.py
'''
import json
from io import BytesIO
import flask
from pypdf import PdfReader
from pypdf import PdfWriter

from utils import logs
from utils import converts



router = flask.Blueprint('merge', __name__)



@router.route('', methods=['POST'])
def post_file_list():
    '''
    post_file_list()
    '''
    logs.debug('(merge.post_file_list) flask.request.data: ...')
    data_list = json.loads(flask.request.data.decode())
    pdf_writer = PdfWriter()
    for data in data_list:
        pdf_reader = PdfReader(BytesIO(converts.base64_to_bytes(data)))
        for page in pdf_reader.pages:
            pdf_writer.add_page(page)
    bytes_io = BytesIO()
    pdf_writer.write(bytes_io)
    bytes_io.seek(0)
    return {
        'success': True,
        'data': converts.bytes_to_base64(bytes_io.read())
    }
