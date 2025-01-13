def countWordFrequencies(paragraph):
    wordsList = paragraph.split()
    tempDict = {}
    for word in wordsList:
        if word[-1] == '.':
            word = word[:-1]
        if(word.lower() == "the" or word.lower() == "a" or word.lower() == "an"):
            continue
        else:
            if word in tempDict:
                tempDict[word] += 1
            else:
                tempDict[word] = 1
    return tempDict

# paragraph = input("Enter a paragraph: ")
paragraph = "This is a paragraph. This paragraph is a sample paragraph. This is the third sentence of the paragraph. Word Counting is so much fun. I love counting words. I love counting words in a paragraph. This is the last sentence of the paragraph."
wordFerequencyDictionary = countWordFrequencies(paragraph)
print(wordFerequencyDictionary)