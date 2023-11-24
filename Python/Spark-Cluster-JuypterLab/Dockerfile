FROM spark-base as pyspark

ARG jupyterlab_version=4.0.1

ENV SPARK_REMOTE="sc://spark-master"
RUN unset SPARK_MASTER

RUN mkdir /opt/notebooks

RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev && \
    pip3 install --upgrade pip && \
    pip3 install wget jupyterlab==${jupyterlab_version}

EXPOSE 8888

WORKDIR /opt/notebooks

CMD jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root --NotebookApp.token=