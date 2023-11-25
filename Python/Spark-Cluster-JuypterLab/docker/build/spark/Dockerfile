ARG spark_version
FROM spark-base:spark-base-${spark_version} as spark

LABEL manteiner="Saqib Ullah Siddiqui <saqibullah@msn.com>"

# -- Layer: Image Metadata
ARG build_date

LABEL org.label-schema.build-date=${build_date}
LABEL org.label-schema.name="Apache Spark Image - Apache Spark cluster setup"
LABEL org.label-schema.description="Apache Spark base image, use for master and worker"
LABEL org.label-schema.url="https://github.com/technetbytes/Programs/Python/Spark-Cluster-JuypterLab"
LABEL org.label-schema.schema-version="1.0"

# Install python libraries & packages
COPY requirements/requirements.txt .
RUN pip3 install -r requirements.txt

# Setup Spark related environment variables
ENV PATH="/opt/spark/sbin:/opt/spark/bin:${PATH}"
ENV SPARK_MASTER="spark://spark-master:7077"
ENV SPARK_MASTER_HOST spark-master
ENV SPARK_MASTER_PORT 7077
ENV PYSPARK_PYTHON python3

# Copy the default configurations into $SPARK_HOME/conf
COPY conf/spark-defaults.conf "$SPARK_HOME/conf"

RUN chmod u+x /opt/spark/sbin/* && \
    chmod u+x /opt/spark/bin/*

ENV PYTHONPATH=$SPARK_HOME/python/:$PYTHONPATH

# Copy appropriate entrypoint script
COPY entrypoint.sh .
# change permission of the bash script
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]