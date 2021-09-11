import math


def judge(value):
    sq = math.sqrt(value)
    for j in range(2, int(sq)+1):
        if value % j == 0:
            # 不是质数
            return False
    return True


if __name__ == '__main__':
    res = int(input())

    com = 0
    for i in range(3, int(res / 2)+1):
        if judge(i):
            other = res - i
            if judge(other):
                com = com + 1
    print(com)