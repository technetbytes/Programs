import requests

proxies = {
   'http': 'http://138.68.60.8:8080',
   'https': 'https://138.68.60.8:8080',
}

try:
	req = requests.get("https://www.markematics.com.pk", proxies = proxies)
	if req.status_code == 200:
		print("yes")
	else:
		print("sorry")
except Exception as e:
	print("sorry")
	print(e)
