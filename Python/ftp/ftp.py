# from ftplib import FTP  
# #ftp = FTP('66.109.20.100')
# #ftp.login('root', 'D6w07e5#o$Y3#Khko')
# import paramiko
# ssh = paramiko.SSHClient()
# ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# ssh.connect('66.109.20.100', username = 'root', password = 'D6w07e5#o$Y3#Khko')

import random

tabs = ['about','jobs','posts','events','people']
visited_tab = []
tab = None
while tab != 'people':
    print(random.randint(150, 450))
    tab = random.choice(tabs)
    if tab in visited_tab:
        print("already visited ... {}".format(tab))
    else:
        visited_tab.append(tab)
        print(tab)
