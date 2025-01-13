def isPerfect(number, divisors):
    sum = 0
    returnBool = False
    for divisor in divisors:
        sum += divisor
    if(sum == number):
        returnBool = True
    return returnBool

def getDivisors(number):
    divisors = []
    for i in range(1, int(number+1/2)):
        if(number % i == 0):
            divisors.append(i)
    return divisors

number = int(input("Enter a number: "))
print(getDivisors(number))
if(isPerfect(number, getDivisors(number)) == True):
    print("The number is Perfect")
else:
    print("The number is not a Perfect number")