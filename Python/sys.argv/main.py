import sys

def test(args):
    print(len(args))
    for each in args:
        print((each))


# python main.py 'a','b','c' saqib.json 'account_1','account_2'
if __name__ == "__main__":
    test(sys.argv[1:])