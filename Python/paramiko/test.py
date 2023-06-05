import paramiko
remoteFilePath = '/root/90/proxy/proxy.csv'
localFilePath = 'tempproxies.csv'
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('66.109.20.100', username='root', password='D6w07e5#o$Y3#Khko')
sftp = ssh.open_sftp()
sftp.get(remoteFilePath,localFilePath)
sftp.close()
ssh.close()