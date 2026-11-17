 
# ==========================================
# SISTEMA DE GERENCIAMENTO - FUNILARIA DO JOSÉ

# Este sistema foi desenvolvido para facilitar
# o gerenciamento de uma funilaria de carros.
# O programa permite:
# 1 - Cadastrar clientes e seus veículos.
# 2 - Escolher serviços de pintura, funilaria, polimento e martelinho de ouro.
# 3 - Consultar os preços de cada serviço.
# 4 - Escolher a forma de pagamento.
# 5 - Calcular o valor das parcelas.
# 6 - Mostrar todos os serviços cadastrados.
# O sistema utiliza:
# - Listas para armazenar os orçamentos.
# - Funções para organizar o código.
# - Match Case para selecionar opções.
# - While para manter o menu funcionando.
# - If para verificar condições.
# ==========================================



import os
os.system("cls")
# Lista que armazena todos os orçamentos cadastrados
orcamentos = []


# Função responsável por cadastrar um novo serviço
def cadastrar():

    # Solicita os dados do cliente e do veículo
    print("\n===== Cadastro de serviço =====")

    nome = input("Nome do cliente: ")
    carro = input("Modelo do carro: ")
    placa = input("Placa do carro: ")


    # Mostra as opções de serviços disponíveis
    print("\nServiços:")
    print("1 - Pintura")
    print("2 - Funilaria")
    print("3 - Polimento")
    print("4 - Martelinho de ouro")


    # Recebe a escolha do cliente
    opcao = input("Escolha o serviço: ")


    # Match case verifica qual serviço foi escolhido
    match opcao:

        # Caso o cliente escolha pintura
        case "1":
            servico = "Pintura"


            # Mostra as opções de pintura e seus preços
            print("\n=== O que deseja pintar? ===")
            print("1 - Capô - R$ 500")
            print("2 - Portas - R$ 800")
            print("3 - Teto - R$ 700")
            print("4 - Para-choque - R$ 400")
            print("5 - Carro inteiro - R$ 3.500")

            escolha = input("Escolha: ")

            # Verifica qual parte do carro será pintada
            match escolha:
                case "1":
                    detalhe = "Capô"
                    preco = 500
                case "2":
                    detalhe = "Portas"
                    preco = 800
                case "3":
                    detalhe = "Teto"
                    preco = 700
                case "4":
                    detalhe = "Para-choque"
                    preco = 400
                case "5":
                    detalhe = "Carro inteiro"
                    preco = 3500
                case _:
                    print("Opção inválida!")
                    return

        # Caso o cliente escolha funilaria
        case "2":
            servico = "Funilaria"

            # Mostra os tipos de reparos disponíveis
            print("\n=== Qual reparo deseja fazer? ===")
            print("1 - Amassados - R$ 300")
            print("2 - Portas - R$ 600")
            print("3 - Capô - R$ 500")
            print("4 - Teto - R$ 700")
            print("5 - Lateral - R$ 600")

            escolha = input("Escolha: ")


            # Define o reparo e seu respectivo preço
            match escolha:
                case "1":
                    detalhe = "Amassados"
                    preco = 300
                case "2":
                    detalhe = "Portas"
                    preco = 600
                case "3":
                    detalhe = "Capô"
                    preco = 500
                case "4":
                    detalhe = "Teto"
                    preco = 700
                case "5":
                    detalhe = "Lateral"
                    preco = 600
                case _:
                    print("Opção inválida!")
                    return

        # Caso o cliente escolha polimento
        case "3":
            servico = "Polimento"

            # Mostra os tipos de polimento e seus preços
            print("\n=== Tipo de polimento === ")
            print("1 - Polimento simples - R$ 150")
            print("2 - Polimento comercial - R$ 300")
            print("3 - Polimento técnico - R$ 500")

            escolha = input("Escolha: ")

            # Define o tipo de polimento e o preço
            match escolha:
                case "1":
                    detalhe = "Polimento simples"
                    preco = 150
                case "2":
                    detalhe = "Polimento comercial"
                    preco = 300
                case "3":
                    detalhe = "Polimento técnico"
                    preco = 500
                case _:
                    print("Opção inválida!")
                    return

        # Caso o cliente escolha martelinho de ouro
        case "4":
            servico = "Martelinho de ouro"

            # Mostra as partes do carro que podem ser reparadas
            print("\n=== Onde deseja o reparo? ===")
            print("1 - Portas - R$ 250")
            print("2 - Capô - R$ 300")
            print("3 - Teto - R$ 400")
            print("4 - Lateral - R$ 350")

            escolha = input("Escolha: ")

            # Define a parte escolhida e seu preço
            match escolha:
                case "1":
                    detalhe = "Portas"
                    preco = 250
                case "2":
                    detalhe = "Capô"
                    preco = 300
                case "3":
                    detalhe = "Teto"
                    preco = 400
                case "4":
                    detalhe = "Lateral"
                    preco = 350
                case _:
                    print("Opção inválida!")
                    return

        # Caso o cliente escolha uma opção inexistente
        case _:
            print("Opção inválida!")
            return

    # Junta o nome do serviço com o detalhe escolhido
    servico = servico + " - " + detalhe

    # Inicia a área de pagamento
    print("\n=== ÁREA DE PAGAMENTO ===")
    print("Valor total: R$", preco)

    # Mostra as formas de pagamento disponíveis
    print("\nFormas de pagamento:")
    print("1 - Débito")
    print("2 - Crédito à vista")
    print("3 - Crédito parcelado")
    print("4 - Pix")

    # Recebe a forma de pagamento escolhida
    pagamento = input("Escolha a forma de pagamento: ")

    # Define o valor inicial de parcelas como 1
    parcelas = 1

    # Verifica a forma de pagamento escolhida
    match pagamento:
        case "1":
            forma = "Cartão de débito"

        case "2":
            forma = "Crédito à vista"

        # Caso o cliente escolha crédito parcelado
        case "3":
            forma = "Crédito parcelado"

            # Mostra as opções de parcelamento
            print("\nParcelas disponíveis:")
            print("2 - 2x Sem juros")
            print("3 - 3x Sem juros")
            print("4 - 4x Sem juros")
            print("5 - 5x Sem juros")
            print("6 - 6x Sem juros")

            parcelas = input("Escolha a quantidade de parcelas: ")

            # Verifica se a quantidade de parcelas é válida
            match parcelas:
                case "2" | "3" | "4" | "5" | "6":
                    parcelas = int(parcelas)

                    # Calcula o valor de cada parcela
                    valor_parcela = preco / parcelas

                case _:
                    print("Quantidade de parcelas inválida!")
                    return

        # Caso o cliente escolha Pix
        case "4":
            forma = "Pix"

        # Caso escolha uma forma de pagamento inválida
        case _:
            print("Forma de pagamento inválida!")
            return

    # Salva todas as informações do orçamento na lista
    orcamentos.append([nome, carro, placa, servico, preco, forma, parcelas])

    # Mostra o resumo do orçamento cadastrado
    print("\n===== RESUMO DO ORÇAMENTO =====")
    print("Cliente:", nome)
    print("Carro:", carro)
    print("Placa:", placa)
    print("Serviço:", servico)
    print("Valor total: R$", preco)
    print("Pagamento:", forma)

    # Se for parcelado, mostra a quantidade e o valor das parcelas
    if forma == "Crédito parcelado":
        print("Parcelas:", parcelas)
        print("Valor de cada parcela: R$", round(valor_parcela, 2))

    print("\nA funilaria do José agradece pela confiança!")


# Função responsável por mostrar todos os serviços cadastrados
def mostrar():

    print("\n=== Serviços cadastrados ===")

    # Verifica se existe algum orçamento na lista
    match len(orcamentos):

        # Caso a lista esteja vazia
        case 0:
            print("Nenhum serviço encontrado.")

        # Caso existam serviços cadastrados
        case _:

            # Percorre todos os orçamentos armazenados
            for item in orcamentos:

                print("=======================")

                # Mostra os dados de cada cliente
                print("Cliente:", item[0])
                print("Carro:", item[1])
                print("Placa:", item[2])
                print("Serviço:", item[3])
                print("Preço: R$", item[4])
                print("Pagamento:", item[5])

                # Mostra as parcelas caso o pagamento seja parcelado
                if item[5] == "Crédito parcelado":
                    print("Parcelas:", item[6])

                    # Calcula novamente o valor de cada parcela
                    print("Valor de cada parcela: R$", round(item[4] / item[6], 2))


# Laço de repetição que mantém o sistema funcionando
while True:

    # Mostra o menu principal
    print("\n=== FUNILARIA DO JOSÉ ===")
    print("1 - Cadastrar serviço")
    print("2 - Mostrar serviços")
    print("3 - Sair")

    # Recebe a opção escolhida pelo usuário
    escolha = input("Digite uma opção: ")

    # Verifica qual opção foi escolhida
    match escolha:

        # Chama a função de cadastro
        case "1":
            cadastrar()

        # Chama a função que mostra os serviços
        case "2":
            mostrar()

        # Encerra o sistema
        case "3":
            print("A nossa funilaria agradece pelos serviços!")
            break

        # Caso seja digitada uma opção inválida
        case _:
            print("Está opção não existe!")
