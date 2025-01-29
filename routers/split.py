'''
split.py
'''
import json
from io import BytesIO
import flask
from pypdf import PdfReader
from pypdf import PdfWriter

from utils import logs
from utils import converts



router = flask.Blueprint('split', __name__)



@router.route('', methods=['POST'])
def post_file_list():
    '''
    post_file_list()
    '''
    logs.debug('(split.post_file_list) flask.request.data: ...')
    data_list = json.loads(flask.request.data.decode())
    pdf_writer_front = PdfWriter()
    pdf_writer_back = PdfWriter()
    for data in data_list:
        pdf_reader = PdfReader(BytesIO(converts.base64_to_bytes(data)))
        for i in range(0, len(pdf_reader.pages), 2):
            pdf_writer_front.add_page(pdf_reader.pages[i])
        for i in range(1, len(pdf_reader.pages), 2):
            pdf_writer_back.add_page(pdf_reader.pages[i])
        if len(pdf_reader.pages) % 2 == 1:
            _, _, width, height = pdf_reader.pages[0].mediabox
            pdf_writer_back.add_blank_page(width=width, height=height)
    bytes_io_front = BytesIO()
    pdf_writer_front.write(bytes_io_front)
    bytes_io_front.seek(0)
    bytes_io_back = BytesIO()
    pdf_writer_back.write(bytes_io_back)
    bytes_io_back.seek(0)
    return {
        'success': True,
        'data': {
            'front': converts.bytes_to_base64(bytes_io_front.read()),
            'back': converts.bytes_to_base64(bytes_io_back.read())
        }
    }
