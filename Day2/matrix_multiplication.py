rows_1 = int(input("Enter the rows of Matrix 1: "))
columns_1 = int(input("Enter the columns of Matrix 1: "))
matrix1 = []
for i in range(rows_1):
    temp = []
    for j in range(columns_1):
        temp.append(int(input("Enter number at row " + str(i) + " and column " + str(j) + ": ")))
    matrix1.append(temp)

rows_2 = int(input("Enter the rows of Matrix 2: "))
columns_2 = int(input("Enter the columns of Matrix 2: "))
matrix2 = []
for i in range(rows_2):
    temp = []
    for j in range(columns_2):
        temp.append(int(input("Enter number at row " + str(i) + " and column " + str(j) + ": ")))
    matrix2.append(temp)

print(matrix1)
print(matrix2)

matrix3 = [[] for i in range(rows_1)]
if(columns_1 == rows_2):
    for i in range(rows_1):
        for j in range(columns_2):
            sum = 0
            for k in range(rows_2):
                sum += int(matrix1[i][k]) * int(matrix2[k][j])
            matrix3[i].append(sum)

    print(matrix3)
else:
    print("Error")