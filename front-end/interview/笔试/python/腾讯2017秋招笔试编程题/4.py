def half_two(n):
    left = -90
    right = 90
    result = ''

    while (right - left) >= 6:
        mid = int((right + left) / 2)
        if n >= mid:
            result += '1'
            left = mid
        else:
            result += '0'
            right = mid
        print(right)
        print(left)
        print('--------------')
    return result


if __name__ == '__main__':
    num = int(input())
    print(half_two(num))