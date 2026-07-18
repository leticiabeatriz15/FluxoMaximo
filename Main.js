import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Grafo } from "./Grafo.js";

// Configura a interface para leitura de dados no terminal
const rl = readline.createInterface({
    input,
    output
});

// Mapeamento de índices numéricos para letras do alfabeto (ex: 0 = A, 1 = B...)
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function letraParaIndice(letra) {
    return letras.indexOf(letra.toUpperCase());
}

// Garante uma entrada válida do usuário convertendo letras para índices internos
async function lerVertice(mensagem, numVertices) {
    while (true) {
        const letra = (await rl.question(mensagem)).trim().toUpperCase();
        const indice = letraParaIndice(letra);

        // Valida se o vértice digitado existe dentro do limite criado
        if (indice >= 0 && indice < numVertices) {
            return indice;
        }

        console.log("❌ Vértice inválido! Tente novamente.");
    }
}

// Valida se a entrada de texto do terminal é estritamente um número maior ou igual a zero
async function lerNumero(mensagem) {
    while (true) {
        const valor = Number(await rl.question(mensagem));

        if (!Number.isNaN(valor) && valor >= 0) {
            return valor;
        }

        console.log("❌ Digite um número válido.");
    }
}

console.log("========== FLUXO MÁXIMO ==========\n");

let numVertices;

// Configuração do tamanho total da matriz do Grafo
while (true) {
    numVertices = await lerNumero("Quantidade de vértices (máx. 26): ");

    if (numVertices > 0 && numVertices <= 26) {
        break;
    }

    console.log("❌ Digite um valor entre 1 e 26.");
}

const g = new Grafo(numVertices);

console.log("\nVértices disponíveis:");
for (let i = 0; i < numVertices; i++) {
    process.stdout.write(`${letras[i]} `);
}
console.log("\n");

const numArestas = await lerNumero("Quantidade de arestas: ");
const arestas = [];

console.log("\n=== Cadastro das arestas ===");
for (let i = 0; i < numArestas; i++) {

    console.log(`\nAresta ${i + 1}`);
    const origem = await lerVertice("Origem: ", numVertices);
    const destino = await lerVertice("Destino: ", numVertices);
    const capacidade = await lerNumero("Capacidade: ");

    g.adicionarAresta(origem, destino, capacidade);

    // Salva na lista auxiliar apenas para fins de exibição posterior no console
    arestas.push({
        origem,
        destino,
        capacidade
    });
}

// Exibe o resumo visual do grafo montado antes do processamento final
console.log("\n========== GRAFO ==========");
arestas.forEach((a, i) => {
    console.log(
        `${i + 1}. ${letras[a.origem]} → ${letras[a.destino]} (capacidade ${a.capacidade})`
    );
});

console.log("\nEscolha a origem e o destino do fluxo máximo.\n");
const origem = await lerVertice("Origem (fonte): ", numVertices);
const destino = await lerVertice("Destino (sumidouro): ", numVertices);

rl.close(); // Encerra a leitura do terminal

// Executa o algoritmo com as coordenadas informadas
const resultado = g.fluxoMaximo(origem, destino);

console.log("\n==============================");
console.log(`Fluxo Máximo (${letras[origem]} → ${letras[destino]}) = ${resultado}`);
console.log("==============================");