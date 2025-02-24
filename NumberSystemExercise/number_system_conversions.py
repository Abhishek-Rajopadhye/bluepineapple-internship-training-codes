def anyNumberSystemToDecimal(base:int, numberToConvert:str) -> int:
    decimalNumber = 0
    index = 0
    digitDict = {
        "0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "A":10, "B":11, "C":12, "D":13, "E":14, "F":15
    }
    
    while(index < len(numberToConvert)):
        decimalNumber += digitDict[numberToConvert[len(numberToConvert) - 1  - index]] * (base ** index)
        index += 1
    
    return decimalNumber

def decimalToAnyNumberSystem(targetBase:int, numberToConvert:int) -> str:
    tempDecimal = numberToConvert
    targetNumber = ""
    digitDict = {
        0:"0", 1:"1", 2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", 10:"A", 11:"B", 12:"C", 13:"D", 14:"E", 15:"F"
    }
    
    while(tempDecimal != 0):
        targetNumber = digitDict[tempDecimal % targetBase] + targetNumber
        tempDecimal = int(tempDecimal / targetBase)
    
    return targetNumber

def anyToAnyNumberSystem(base, targetBase, numberToConvert):
    numberToConvertDecimal = anyNumberSystemToDecimal(base, numberToConvert)
    targetNumber = decimalToAnyNumberSystem(targetBase, numberToConvertDecimal)
    
    return targetNumber

print(anyToAnyNumberSystem(16,2,"A1FE9128"))