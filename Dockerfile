FROM python:3.9
RUN mkdir /main
ADD . /main
WORKDIR /main
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install sseclient
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
COPY . .
CMD ["python","main.py"]