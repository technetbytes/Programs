FROM os-base as juypterlab

LABEL manteiner="Saqib Ullah Siddiqui <saqibullah@msn.com>"

# -- Layer: Image Metadata
ARG build_date

LABEL org.label-schema.build-date=${build_date}
LABEL org.label-schema.name="Juypter Lab Image - Apache Spark cluster setup"
LABEL org.label-schema.description="Juypter Lab image shipped with Python and PySpark"
LABEL org.label-schema.url="https://github.com/technetbytes/Programs/Python/Spark-Cluster-JuypterLab"
LABEL org.label-schema.schema-version="1.0"

# -- Layer: Juypter Lab
ARG jupyterlab_version
ARG spark_version

ENV SPARK_REMOTE="sc://spark-master"
RUN unset SPARK_MASTER

RUN mkdir /opt/notebooks

RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev && \
    pip3 install --upgrade pip && \
    pip3 install wget==3.2 pyspark==${spark_version} && \
    pip3 install wget jupyterlab==${jupyterlab_version}

EXPOSE 8888

WORKDIR /opt/notebooks

CMD jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root --NotebookApp.token=