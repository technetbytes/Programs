#!/bin/bash
#
# -- Build Apache Spark Standalone Cluster Docker Images

# ----------------------------------------------------------------------------------------------------------------------
# -- Variables ---------------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------

BUILD_DATE="$(date -u +'%Y-%m-%d')"
SPARK_VERSION="3.5.0"
HADOOP_VERSION="3"
JUPYTER_LAB_VERSION="4.0.1"

function build_docker_images() {
# -- build docker base os-image
echo "1. Building docker os-base image" 
docker build --build-arg build_date="${BUILD_DATE}" -f build/os-base/Dockerfile -t os-base:latest .

echo "2. Building docker spark-base image" 
docker build --build-arg build_date="${BUILD_DATE}" --build-arg SPARK_VERSION="{$SPARK_VERSION}" --build-arg HADOOP_VERSION="{$HADOOP_VERSION}" -f build/spark-base/Dockerfile -t spark-base:spark-base-${SPARK_VERSION} .

echo "3. Building docker spark-image image" 
docker build --build-arg build_date="${BUILD_DATE}" --build-arg spark_version=${SPARK_VERSION} -f build/spark/Dockerfile -t spark-image:spark-image-${SPARK_VERSION} .

echo "4. Building docker jupyter-lab image" 
docker build --build-arg build_date="${BUILD_DATE}" --build-arg spark_version=${SPARK_VERSION} --build-arg jupyterlab_version=${JUPYTER_LAB_VERSION} -f build/jupyter-lab/Dockerfile -t pyspark-jupyterlab:spark-${SPARK_VERSION}-jupyterLab .
}

# ----------------------------------------------------------------------------------------------------------------------
# -- Main Docker Image Builder ---------------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------
build_docker_images;