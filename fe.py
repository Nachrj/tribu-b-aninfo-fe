def mochila(pesos, valores, capacidad):
    n = len(pesos)
    matriz = [[0] * (capacidad + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for j in range(1, capacidad + 1):
            if pesos[i - 1] <= j:
                matriz[i][j] = max(matriz[i - 1][j], valores[i - 1] + matriz[i - 1][j - pesos[i - 1]])
            else:
                matriz[i][j] = matriz[i - 1][j]
    
    for i in range(n + 1):
        print(matriz[i])

mochila([6, 1, 3, 100, 4, 2], [10, 1, 8, 100, 6, 11], 8)