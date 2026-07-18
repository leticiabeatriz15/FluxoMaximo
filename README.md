# Trabalho de Tópicos Especiais em Computação – 2026.1
**Professor:** João Paulo  
**Instituição:** Instituto Federal de Educação, Ciência e Tecnologia do Piauí (IFPI) - Campus Picos  

## Identificação do Aluno
* **Nome Completo:** Letícia Beatriz de Holanda Vieira

---

## 1. Introdução

### O Problema do Fluxo Máximo
O problema do Fluxo Máximo é um dos problemas fundamentais da otimização combinatória e da teoria dos grafos. Ele consiste em modelar uma rede de transporte direcionada onde cada aresta possui uma capacidade máxima de vazão. O objetivo principal é determinar a quantidade máxima de fluxo que pode ser enviada de um vértice inicial específico, denominado **origem (fonte)**, até um vértice final, chamado **destino (sumidouro)**, respeitando as limitações de capacidade das arestas e as leis de conservação de fluxo.

### Estratégia Algorítmica: Algoritmo de Edmonds-Karp
Para a resolução deste problema, foi utilizado um **método exato**, especificamente o algoritmo de **Edmonds-Karp**. Este algoritmo é uma implementação e especialização do método clássico de *Ford-Fulkerson*. 

A diferença crucial e a vantagem do Edmonds-Karp sobre a abordagem genérica de Ford-Fulkerson está na escolha do caminho de aumento: ele utiliza obrigatoriamente uma **Busca em Largura (BFS - Breadth-First Search)** para encontrar o caminho mais curto (em número de arestas) da fonte ao sumidouro a cada iteração.

### Complexidade Computacional
Ao garantir que o caminho mais curto seja sempre escolhido via BFS, o algoritmo estabelece um limite superior de tempo estrito:
* **Complexidade de Tempo:** $O(V \cdot E^2)$, onde $V$ é o número de vértices e $E$ é o número de arestas.
* **Complexidade de Espaço:** $O(V^2)$ para armazenar a matriz de adjacência (capacidades residuais da rede) e $O(V)$ para as estruturas auxiliares da BFS.

---

## 2. Desenvolvimento

### Dados do Problema
O sistema foi modelado para receber dinamicamente qualquer rede configurada pelo usuário contendo:
* **Variáveis de Decisão:** O fluxo repassado por cada aresta $f(u, v)$.
* **Função Objetivo:** Maximizar o fluxo total que sai da fonte $s$, isto é, $\max \sum_{v} f(s, v)$.
* **Restrições:** 
  1. *Restrição de Capacidade:* $0 \le f(u, v) \le c(u, v)$ (o fluxo não pode exceder a capacidade da aresta).
  2. *Conservação do Fluxo:* Para qualquer vértice que não seja a fonte ou o sumidouro, o fluxo total que entra deve ser estritamente igual ao fluxo total que sai.

### Detalhes da Implementação
* **Linguagem de Programação:** Node.js (JavaScript moderno ES6+).
* **Módulos Utilizados:** `node:readline/promises` e `node:process` para entrada e saída assíncrona no terminal.
* **Estrutura do Projeto:** 
  * `Grafo.js`: Contém a classe principal com a matriz de adjacência, o método de busca em largura (`bfs`) e a lógica de atualização das arestas residuais e reversas no método `fluxoMaximo`.
  * `Main.js`: Gerencia a interface de linha de comando (CLI), permitindo ao usuário mapear os vértices (letras de A a Z), inserir as arestas com suas respectivas capacidades, além de definir os pontos de origem e destino de forma interativa.

### Instruções de Execução

1. Certifique-se de ter o **Node.js** instalado na sua máquina (versão 18 ou superior recomendada).
2. Clone o repositório e navegue até a pasta do projeto:
   ```bash
   git clone [https://github.com/leticiabeatriz15/FluxoMaximo.git](https://github.com/leticiabeatriz15/FluxoMaximo.git)
   cd FluxoMaximo
3. Execute a aplicação diretamente pelo terminal:
   ```bash
   node Main.js

---

## 3. Conclusão

### Discussão dos Resultados

A implementação se mostrou robusta e cumpriu perfeitamente o propósito de encontrar a solução ótima global do problema de fluxo em grafos (garantido por se tratar de um método exato). O terminal exibe de forma clara o passo a passo da construção da estrutura do grafo e o retorno exato do valor do fluxo máximo.

### Dificuldades Encontradas

A principal dificuldade no desenvolvimento do projeto foi construir uma interface de terminal com uma **execução limpa**, garantindo que o usuário compreendesse perfeitamente o que estava sendo solicitado em cada etapa da inserção de dados (vértices, arestas e capacidades). Além disso, houve um desafio técnico natural na compreensão e aplicação da lógica matemática por trás do cálculo de caminhos aumentantes e atualização das capacidades residuais no grafo.

---

## 4. Referências

1. CESCHIM, Humberto. **Redes de Fluxo - Algoritmo de Ford-Fulkerson**. Universidade Federal de Alfenas (UNIFAL-MG). Disponível em: [https://www.bcc.unifal-mg.edu.br/~humberto/disciplinas/2010_2_grafos/pdf_aulas/aula_16.pdf](https://www.bcc.unifal-mg.edu.br/~humberto/disciplinas/2010_2_grafos/pdf_aulas/aula_16.pdf).
2. RIBEIRO, Pedro. **Desenho e Análise de Algoritmos: Fluxo Máximo**. Faculdade de Ciências da Universidade do Porto (FCUP). Disponível em: [https://www.dcc.fc.up.pt/~pribeiro/aulas/daa2021/slides/10_fluxo_30122020.pdf](https://www.dcc.fc.up.pt/~pribeiro/aulas/daa2021/slides/10_fluxo_30122020.pdf).

```

```
