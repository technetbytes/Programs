from bardapi import Bard

def get_google_bard():
    token = 'XQj58omQYWbbfePDRpYc-M-Fppn9muT0zBzAparcgHz4jpzwBHeUVohIdQRiYkNXSsaM1g.'
    bard = Bard(token=token)
    print(bard.get_answer("dog park insurance")['content'])


def get_google_bard(search_trend, proxies):
    token = 'XQj58omQYWbbfePDRpYc-M-Fppn9muT0zBzAparcgHz4jpzwBHeUVohIdQRiYkNXSsaM1g.'
    bard = Bard(token=token, proxies=proxies, timeout=30)
    return bard.get_answer(search_trend)['content']
