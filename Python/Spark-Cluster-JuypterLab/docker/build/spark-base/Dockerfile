FROM os-base as spark-base
LABEL manteiner="Saqib Ullah Siddiqui <saqibullah@msn.com>"

# -- Layer: Image Metadata
ARG build_date

LABEL org.label-schema.build-date=${build_date}
LABEL org.label-schema.name="Apache Spark base Image - Apache Spark cluster setup"
LABEL org.label-schema.description="Base image shipped with Apache Spark"
LABEL org.label-schema.url="https://github.com/technetbytes/Programs/Python/Spark-Cluster-JuypterLab"
LABEL org.label-schema.schema-version="1.0"

# -- Core Version
ARG SPARK_VERSION
ARG HADOOP_VERSION

# Setup the directories for our Spark and Hadoop installations
ENV SPARK_HOME=${SPARK_HOME:-"/opt/spark"}
ENV HADOOP_HOME=${HADOOP_HOME:-"/opt/hadoop"}

RUN mkdir -p ${HADOOP_HOME} && mkdir -p ${SPARK_HOME}
WORKDIR ${SPARK_HOME}

# Download and install Spark Version base on Params
RUN curl https://dlcdn.apache.org/spark/spark-${SPARK_VERSION}/spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz -o spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz \
 && tar xvzf spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz --directory /opt/spark --strip-components 1 \
 && rm -rf spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz