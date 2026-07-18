export class Grafo {

    constructor(vertices) {
        this.V = vertices;
        this.grafo = Array.from({ length: vertices }, () =>
            Array(vertices).fill(0)
        );
    }

    adicionarAresta(origem, destino, capacidade) {
        this.grafo[origem][destino] = capacidade;
    }

    bfs(origem, destino, pai) {
        const visitado = Array(this.V).fill(false);
        const fila = [];

        fila.push(origem);
        visitado[origem] = true;
        pai[origem] = -1;

        while (fila.length > 0) {
            const u = fila.shift();

            for (let v = 0; v < this.V; v++) {
                if (!visitado[v] && this.grafo[u][v] > 0) {
                    fila.push(v);
                    pai[v] = u;
                    visitado[v] = true;

                    if (v === destino) {
                        return true;
                    }
                }
            }
        }

        return visitado[destino];
    }

    fluxoMaximo(origem, destino) {
        const pai = Array(this.V).fill(-1);
        let fluxoMaximo = 0;

        while (this.bfs(origem, destino, pai)) {
            let fluxoCaminho = Infinity;

            for (let v = destino; v !== origem; v = pai[v]) {
                const u = pai[v];
                fluxoCaminho = Math.min(fluxoCaminho, this.grafo[u][v]);
            }

            for (let v = destino; v !== origem; v = pai[v]) {
                const u = pai[v];
                this.grafo[u][v] -= fluxoCaminho;
                this.grafo[v][u] += fluxoCaminho;
            }

            fluxoMaximo += fluxoCaminho;
        }

        return fluxoMaximo;
    }
}