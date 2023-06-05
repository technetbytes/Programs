from datetime import datetime
import time

date_format_str = '%d/%m/%Y %H:%M:%S.%f'

now_1 = datetime.now()
date_1 = now_1.strftime(date_format_str)

# 15 minutes sleep
time.sleep(9)

now_2 = datetime.now()
date_2 = now_2.strftime(date_format_str)

start = datetime.strptime(date_1, date_format_str)
end =   datetime.strptime(date_2, date_format_str)

# Get interval between two timstamps as timedelta object
diff = end - start

# Get interval between two timstamps in hours
diff_in_hours = diff.total_seconds() / 3600
print('Difference between two datetimes in hours:')
print(diff_in_hours)