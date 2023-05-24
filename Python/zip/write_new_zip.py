import zipfile
path = "D:/PPMain/PPCore/Barry-Kunst-GT/trendScraper.zip"

zout = zipfile.ZipFile ('archve_new.zip', 'w')

with zipfile.ZipFile(path, mode="r") as archive:
	for name in archive.namelist():
		# we avoid to add python file in the new zip file
		if (name[-3:] != '.py'):
			data = archive.read(name)
			zout.writestr(name, data)
	zout.extractall()
	zout.close()