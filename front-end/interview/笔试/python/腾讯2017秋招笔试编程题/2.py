import math


def judge(value):
    if 1 > value or value > 1024:
        return False
    return True


def get_n(value):
    x = int(value / 32)
    y = value % 32
    if x == 32:
        x = x - 1
        y = y + 1
    return [x, y]


if __name__ == '__main__':
    arr = [0] * 32

    re = input()

    v = re.split(' ')
    v1 = int(v[0])
    v2 = int(v[1])

    if judge(v1) and judge(v2):
        [x1, y1] = get_n(v1)
        [x2, y2] = get_n(v2)

        arr[x1] = int(math.pow(10, y1-1))

        if arr[x2] == int(math.pow(10, y2-1)):
            print(1)
        else:
            print(0)
    else:
        print(-1)