from sshtunnel import SSHTunnelForwarder
import pymysql
import pandas as pd

with SSHTunnelForwarder(
    ('ec2-***-***-***-***.ap-southeast-1.compute.amazonaws.com'),
    ssh_username="ec2-user",
    ssh_pkey="D:\keys\bastion-kp.pem",
    remote_bind_address=('db-instance.name.ap-southeast-1.rds.amazonaws.com', 3306)
) as tunnel:
    print("****SSH Tunnel Established****")
 
    db = pymysql.connect(
        host='127.0.0.1', user="admin | root",
        password="************", port=tunnel.local_bind_port
    )
    sql = 'SELECT * from TableName"'
    dataFrame = pd.read_sql(sql, db, index_col='id')
    print(dataFrame.head())
     
print("Data Fetchd .....")