def getInputMatrix():
    rows = int(input("Enter the rows of Matrix: "))
    columns = int(input("Enter the columns of Matrix: "))
    matrix = []
    for i in range(rows):
        temp = []
        for j in range(columns):
            temp.append(int(input("Enter number at row " + str(i) + " and column " + str(j) + ": ")))
        matrix.append(temp)
    return matrix

def matrixMultiplication(matrix1, matrix2):
    rows_1, columns_1 = len(matrix1), len(matrix1[0])
    rows_2, columns_2 = len(matrix2), len(matrix2[0])
    tempMatrix = [[] for i in range(rows_1)]

    if(columns_1 == rows_2):
        for i in range(rows_1):
            for j in range(columns_2):
                sum = 0
                for k in range(rows_2):
                    sum += int(matrix1[i][k]) * int(matrix2[k][j])
                tempMatrix[i].append(sum)

        return tempMatrix
    else:
        print("Error: Mismatched Row-Column pair for matrix multiplication.")
        return None

matrix1 = getInputMatrix()
print("Matrix1:\n", matrix1)

matrix2 = getInputMatrix()
print("Matrix2:\n", matrix2)

matrix3 = matrixMultiplication(matrix1, matrix2)

if(matrix3 != None):
    print("Matrix3(Matrix1 * Matrix2):\n", matrix3)