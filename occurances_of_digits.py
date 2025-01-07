def getDigit(number:int):
    remainder = number % 10
    return remainder

def noOfDigits(number:int):
    power = 1
    while(10**power < number):
        power += 1
    return power

number = int(input("Enter a number"))

length = noOfDigits(number)
count = [0 for i in range(10)]
for i in range(length):
    digit = getDigit(number)
    count[digit] += 1
    number = int(number / 10)

for i in range(len(count)):
    if(count[i] != 0):
        print("Count of digit " + str(i) + " is: " + str(count[i]))
