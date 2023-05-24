import zipfile
path = "D:/PPMain/PPCore/Barry-Kunst-GT/trendScraper.zip"

with zipfile.ZipFile(path, mode="r") as archive:
	for name in archive.namelist():
		# check file python
		if (name[-3:] == '.py'):
			data = archive.read(name)
			print(data)
		else:
			print("non python file")