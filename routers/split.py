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
    pdf_writer_fronte = PdfWriter()
    pdf_writer_retro = PdfWriter()
    for data in data_list:
        pdf_reader = PdfReader(BytesIO(converts.base64_to_byte(data)))
        for i in range(0, len(pdf_reader.pages), 2):
            pdf_writer_fronte.add_page(pdf_reader.pages[i])
        for i in range(1, len(pdf_reader.pages), 2):
            pdf_writer_retro.add_page(pdf_reader.pages[i])
        if len(pdf_reader.pages) % 2 == 1:
            _, _, width, height = pdf_reader.pages[0].mediabox
            pdf_writer_retro.add_blank_page(width=width, height=height)
    bytes_io_fronte = BytesIO()
    pdf_writer_fronte.write(bytes_io_fronte)
    bytes_io_fronte.seek(0)
    bytes_io_retro = BytesIO()
    pdf_writer_retro.write(bytes_io_retro)
    bytes_io_retro.seek(0)
    return {
        'success': True,
        'data': {
            'fronte': converts.byte_to_base64(bytes_io_fronte.read()),
            'retro': converts.byte_to_base64(bytes_io_retro.read())
        }
    }
