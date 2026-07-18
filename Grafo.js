export class Grafo {

    constructor(vertices) {
        this.V = vertices;
        // Inicializa a matriz de adjacência preenchida com zeros (sem fluxo/capacidade inicial)
        this.grafo = Array.from({ length: vertices }, () =>
            Array(vertices).fill(0)
        );
    }

    // Define a capacidade máxima permitida em uma aresta direcionada
    adicionarAresta(origem, destino, capacidade) {
        this.grafo[origem][destino] = capacidade;
    }

    // Busca em Largura (BFS) para encontrar o caminho mais curto de caminhos aumentantes
    bfs(origem, destino, pai) {
        const visitado = Array(this.V).fill(false);
        const fila = [];

        fila.push(origem);
        visitado[origem] = true;
        pai[origem] = -1; // Vértice inicial não tem pai

        while (fila.length > 0) {
            const u = fila.shift();

            for (let v = 0; v < this.V; v++) {
                // Só avança se o vértice não foi visitado e se houver capacidade residual livre
                if (!visitado[v] && this.grafo[u][v] > 0) {
                    fila.push(v);
                    pai[v] = u; // Registra o caminho para poder rastreá-lo depois
                    visitado[v] = true;

                    if (v === destino) {
                        return true; // Caminho até o sumidouro encontrado
                    }
                }
            }
        }

        return visitado[destino];
    }

    // Algoritmo de Edmonds-Karp para cálculo do Fluxo Máximo
    fluxoMaximo(origem, destino) {
        const pai = Array(this.V).fill(-1);
        let fluxoMaximo = 0;

        // Enquanto existir um caminho aumentante viável da origem ao destino
        while (this.bfs(origem, destino, pai)) {
            let fluxoCaminho = Infinity;

            // Encontra a menor capacidade residual ao longo do caminho descoberto
            for (let v = destino; v !== origem; v = pai[v]) {
                const u = pai[v];
                fluxoCaminho = Math.min(fluxoCaminho, this.grafo[u][v]);
            }

            // Atualiza as capacidades da rede: subtrai no sentido direto e soma no reverso
            for (let v = destino; v !== origem; v = pai[v]) {
                const u = pai[v];
                this.grafo[u][v] -= fluxoCaminho; // Reduz a capacidade residual
                this.grafo[v][u] += fluxoCaminho; // Permite um possível refluxo (aresta reversa)
            }

            // Acumula o fluxo enviado por este caminho no total
            fluxoMaximo += fluxoCaminho;
        }

        return fluxoMaximo;
    }
}