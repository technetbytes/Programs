FROM os-base as spark-base
LABEL manteiner="Saqib Ullah Siddiqui <saqibullah@msn.com>"

ARG SPARK_VERSION=3.5.0

LABEL org.label-schema.build-date=${build_date}
LABEL org.label-schema.name="Base Operating System Image - Apache Spark cluster setup"
LABEL org.label-schema.description="Cluster base image shipped with Java and Python"
LABEL org.label-schema.url="https://github.com/technetbytes/Programs/Python/Spark-Cluster-JuypterLab"
LABEL org.label-schema.schema-version="1.0"

# Setup the directories for our Spark and Hadoop installations
ENV SPARK_HOME=${SPARK_HOME:-"/opt/spark"}
ENV HADOOP_HOME=${HADOOP_HOME:-"/opt/hadoop"}

RUN mkdir -p ${HADOOP_HOME} && mkdir -p ${SPARK_HOME}
WORKDIR ${SPARK_HOME}

# Download and install Spark
RUN curl https://dlcdn.apache.org/spark/spark-${SPARK_VERSION}/spark-${SPARK_VERSION}-bin-hadoop3.tgz -o spark-${SPARK_VERSION}-bin-hadoop3.tgz \
 && tar xvzf spark-${SPARK_VERSION}-bin-hadoop3.tgz --directory /opt/spark --strip-components 1 \
 && rm -rf spark-${SPARK_VERSION}-bin-hadoop3.tgz

# Install python deps
COPY requirements/requirements.txt .
RUN pip3 install -r requirements.txt