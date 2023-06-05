import paramiko
remoteFilePath = '/root/90/data/data.csv'
localFilePath = 'tempproxies.csv'
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('', username='root', password='')
sftp = ssh.open_sftp()
sftp.get(remoteFilePath,localFilePath)
sftp.close()
ssh.close()