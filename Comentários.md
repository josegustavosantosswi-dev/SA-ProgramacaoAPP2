
# Devolutiva formativa — Atividade 01 da SA

**Estudante:** José Gustavo  
**Turma:** Rio Negrinho — Tarde  
**Unidade Curricular:** Programação de Aplicativos  
**Projeto:** Oficina Mecânica — Funilaria do José  
**Código analisado:** `codigo/app.py`  
**Referência:** Situação de Aprendizagem nº 1 — *Da Ideia ao Código*

## O que você já conseguiu desenvolver

José Gustavo, você desenvolveu um sistema de orçamentos para uma funilaria, contemplando diferentes tipos de serviços e formas de pagamento. O projeto apresenta regras de negócio claras, um fluxo de atendimento organizado e uma boa quantidade de comentários explicativos.

Pontos positivos identificados:

- Implementou opções de **pintura, funilaria, polimento e martelinho de ouro**, com serviços e preços específicos.
- Utilizou **`match/case`** para organizar as escolhas do usuário e tratar opções inválidas.
- Criou funções como `cadastrar()` e `mostrar()`, separando o registro de orçamentos da consulta.
- Utilizou uma lista para armazenar informações de cliente, veículo, serviço, preço e forma de pagamento.
- Implementou o cálculo de parcelas para pagamentos no crédito parcelado.
- Apresentou um resumo do orçamento após o cadastro.
- Incluiu comentários que explicam boa parte das regras e das operações realizadas.

## O que precisa ser corrigido

### 1. Validar os dados obrigatórios do orçamento

O programa recebe nome do cliente, modelo e placa do veículo sem verificar se esses campos foram preenchidos.

**Como melhorar:** aplicar `.strip()` às entradas e impedir o cadastro de orçamentos com informações obrigatórias vazias. Também é importante padronizar a placa informada.

### 2. Reduzir a repetição dos menus de serviços

A função `cadastrar()` contém várias estruturas `match/case` semelhantes para apresentar serviços e atribuir preços.

**Como melhorar:** criar uma tabela de serviços em um dicionário e utilizar uma função reutilizável para apresentar opções e recuperar os preços. Assim, a alteração de um valor não exigirá modificar diferentes trechos do código.

### 3. Melhorar a estrutura de armazenamento dos orçamentos

Cada orçamento é salvo como uma lista, e a função `mostrar()` acessa os dados por posições, como `item[0]`, `item[4]` e `item[6]`.

**Como melhorar:** utilizar dicionários com chaves como `cliente`, `placa`, `servico`, `preco`, `pagamento` e `parcelas`. Isso torna o programa mais legível e reduz o risco de consultar a posição errada.

## Oportunidades de melhoria

### 4. Centralizar o cálculo do parcelamento

O valor das parcelas é calculado no cadastro e novamente na consulta.

**Como melhorar:** criar uma função de cálculo reutilizável que receba o valor total e a quantidade de parcelas. Testar o resultado para diferentes preços e quantidades de parcelas.

### 5. Melhorar a apresentação dos valores monetários

O programa utiliza números inteiros para os preços e `round()` para mostrar as parcelas. A solução atende ao protótipo, mas é importante apresentar os valores de maneira consistente.

**Como melhorar:** padronizar as mensagens monetárias com duas casas decimais e verificar o resultado quando um valor não for divisível igualmente pela quantidade de parcelas.

### 6. Tornar o código mais portátil

O comando `os.system("cls")` funciona no Windows, mas não é adequado para todos os sistemas operacionais.

**Como melhorar:** criar uma função para limpar a tela e escolher o comando de acordo com o ambiente.

### 7. Aprimorar a documentação

Os comentários são numerosos e demonstram preocupação com a compreensão do código. Entretanto, alguns apenas repetem exatamente o que a próxima instrução realiza.

**Como melhorar:** manter comentários que expliquem regras, decisões e cálculos, além de adicionar docstrings às funções. O README pode apresentar exemplos de utilização do sistema.

## Testes recomendados

1. Cadastrar um orçamento para cada categoria de serviço.
2. Tentar selecionar um serviço inexistente.
3. Informar nome, veículo ou placa vazios.
4. Simular pagamentos por débito, crédito à vista, Pix e parcelamento.
5. Selecionar quantidades de parcelas válidas e inválidas.
6. Consultar os orçamentos registrados.
7. Confirmar o cálculo das parcelas em valores que produzam centavos.

## Prioridades para a próxima versão

1. **Validar os campos obrigatórios.**
2. **Substituir os menus repetitivos por estruturas reutilizáveis.**
3. **Representar os orçamentos com dicionários.**
4. **Centralizar o cálculo das parcelas.**
5. **Revisar comentários e registrar testes.**

## Mensagem final

José Gustavo, seu projeto demonstra uma boa compreensão de **estruturas de decisão, funções, listas, cálculos e regras de negócio**. Você conseguiu representar uma situação prática de atendimento em uma oficina e organizar diferentes alternativas de serviço e pagamento.

O principal avanço agora será reduzir repetições e tornar o armazenamento das informações mais claro. **Continue aprimorando a organização do código e verificando os resultados dos cálculos.** Seu projeto já oferece uma base útil para futuras funcionalidades.
