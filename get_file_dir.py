import os

# 获取文件路径
# print(os.listdir(os.getcwd()))
# 判断是不是文件
# os.path.isdir()

flag = 0
mark = '\t'
ignore_file = ['.git', '.idea', 'images']


def print_format(item):
    print(mark * flag + item)


def read_file_name(path):
    global flag
    os.chdir(path)
    dir_list = os.listdir(path)
    for item in dir_list:
        if item in ignore_file:
            continue
        absolute_path = os.path.join(path, item)
        if os.path.isdir(absolute_path):
            print_format(item)
            flag += 1
            read_file_name(absolute_path)
            flag -= 1


read_file_name(os.getcwd())