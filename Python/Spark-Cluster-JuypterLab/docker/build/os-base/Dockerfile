FROM python:3.11-bullseye as os-base
LABEL manteiner="Saqib Ullah Siddiqui <saqibullah@msn.com>"

# -- Layer: Image Metadata
ARG build_date

LABEL org.label-schema.build-date=${build_date}
LABEL org.label-schema.name="Base Operating System Image - Apache Spark cluster setup"
LABEL org.label-schema.description="Cluster base image shipped with Java and Python"
LABEL org.label-schema.url="https://github.com/technetbytes/Programs/Python/Spark-Cluster-JuypterLab"
LABEL org.label-schema.schema-version="1.0"


# -- Layer: OS + Java + Python
# Install tools required by the OS
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      sudo \
      curl \
      vim \
      unzip \
      rsync \
      openjdk-11-jdk \
      build-essential \
      software-properties-common \
      ssh && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# # -- Entrypoint
# COPY entrypoint.sh .
# RUN chmod +x ./entrypoint.sh
# ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]

# -- Runtime
CMD ["bash"]