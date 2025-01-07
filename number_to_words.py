def numOfDigits(number):
    power = 1
    while(10**power < number):
        power += 1
    return power
onesMap = {
    1:"One", 2:"Two", 3:"Three", 4:"Four", 5:"Five", 6:"Six", 7:"Seven", 8:"Eight", 9:"Nine"
}
tensAMap = {
    0:"Ten", 1:"Eleven", 2:"Twelve", 3:"Thirteen", 4:"Fourteen", 5:"Fifteen", 6:"Sixteen", 7:"Seventeen", 8:"Eighteen", 9:"Nineteen"
}
tensBMap = {
    2:"Twenty", 3:"Thirty", 4:"Forty", 5:"Fifty", 6:"Sixty", 7:"Seventy", 8:"Eighty", 9:"Ninety"
}
number = int(input("Enter a number: "))
length = numOfDigits(number)
numsplit = []
for i in range(length):
    numsplit.insert(0, int(number%10))
    number = int(number/10)
word = ""
place = length
for i in range(len(numsplit)):
    if(place %2 != 0 or place==2):
        if(place == 2):
            word += tensAMap[numsplit[i+1]]
            break
        elif(place == 3):
            word += onesMap[numsplit[i]] + " Hundred"
        else:
            word += tensBMap[numsplit[i]]
    else:
        word += onesMap[numsplit[i]]

    if(place == 8):
        if(numsplit[i] == 1):
            word += " Crore"
        else:
            word += " Crores"
    elif(place == 6):
        if(numsplit[i] == 1):
            word += " Lakh"
        else:
            word += " Lakhs"
    elif(place == 4):
        word += " Thousand"
    word += " "

    place -= 1

print(word)