## US Funcionais
| NOME | DETALHAMENTO | CRITERIO DE ACEITAÇÃO | FONTE |
| :---: | :--- | :--- | :---: |
| Busca com Filtros | Eu, como usuário, gostaria de filtrar os pontos de coleta por tipo de material aceito, horário de funcionamento e serviços disponíveis, para encontrar um local adequado com mais facilidade. | O sistema deve permitir filtrar pontos de coleta por tipo de material aceito, horário de funcionamento e serviços disponíveis. Os resultados devem exibir apenas os pontos compatíveis com os filtros selecionados. O usuário deve poder remover ou alterar os filtros aplicados. Quando não houver resultados compatíveis, o sistema deve informar isso claramente e permitir ajustar a busca. | IA |
| Detalhes do Ponto de Coleta | Eu, como usuário, gostaria de consultar informações detalhadas de um ponto de coleta, para confirmar que ele pode receber meu equipamento antes de me deslocar até o local. | 1. A página de cada ponto de coleta deve apresentar endereço e horário de funcionamento. Deve listar os tipos de materiais aceitos e os serviços oferecidos, quando informados. O sistema deve exibir a data da última atualização das informações. Se uma informação não estiver disponível, o sistema deve identificá-la como não informada, em vez de presumir um valor. | IA |
| Guia de Descarte | Eu, como usuário, gostaria de um guia claro de quais itens/matériais eu posso enviar para reciclagem para evitar levar itens que não os pontos de coleta não tem capacidade de reciclar. | Uma página popup pode ser adicionada para dispor um lista dos itens aceitos pelos pontos de coleta | Time |
| Histórico de Descartes | Eu, como usuário, gostaria de consultar os equipamentos que registrei para descarte, para acompanhar minhas solicitações e manter um histórico pessoal. | O sistema deve apresentar uma lista dos descartes registrados pelo usuário, com data, item e status. O usuário deve poder abrir cada registro para consultar seus detalhes e atualizações de status. O histórico deve exibir claramente quando um descarte foi concluído, está em andamento ou foi cancelado. O usuário deve poder cancelar ou remover um registro que ainda não esteja concluído, quando aplicável. | IA |
| Opção de Descarte | Eu, como usuário que deseja descartar um equipamento eletrônico, gostaria de escolher entre as opções de descarte disponíveis para o meu item, para encaminhá-lo a uma alternativa adequada, segura e ambientalmente responsável. | O sistema deve apresentar as opções de destinação disponíveis para o tipo de equipamento selecionado, como reutilização, doação, reparo ou reciclagem, quando aplicáveis. Cada opção deve explicar claramente o que acontece com o equipamento e quais condições o usuário precisa cumprir antes de entregá-lo. O sistema deve mostrar pontos de coleta ou serviços compatíveis com a opção escolhida e informar quando uma alternativa não estiver disponível para aquele item ou local. O usuário deve poder comparar as opções e confirmar sua escolha antes de receber as instruções finais de encaminhamento. O sistema não deve indicar como disponível uma opção ou ponto de coleta cuja compatibilidade não tenha sido cadastrada. | IA |
| Painel de Gestão de Capacidade | Eu, como responsável por um ponto de coleta, gostaria de visualizar e atualizar a situação e a capacidade de recebimento do meu ponto em um painel, para evitar sobrecarga e organizar o recebimento de resíduos eletrônicos. | O sistema deve permitir que o responsável cadastre e atualize a capacidade total e o volume atual de resíduos recebidos, por categoria (ex.: baterias, cabos e equipamentos). O painel deve exibir a situação do ponto de forma clara (ex.: disponível, próximo do limite ou lotado), com base nas informações registradas. A situação atualizada deve ser refletida na consulta feita pelos cidadãos, indicando quando o ponto estiver próximo do limite ou sem capacidade de receber. O sistema deve registrar a data e a hora da última atualização e alertar o responsável quando a ocupação atingir o limite definido. | IA |
| Rotas no Mapa | Eu como usuário gostaria que o aplicativo mostrasse a rota até o ponto de coleta mais próximo para facilitar o encaminhamento dos itens a empresas de reciclagem. | O aplicativo pode ter uma extensão com GPS que mostre rotas a partir da localização até pontos de coleta cadastrados. | TIME |

## US Éticos
| Coluna 1 | Coluna 2 | Coluna 3 |
| --- | --- | --- |
| Dado A1 | Dado A2 | Dado A3 |
| Dado B1 | Dado B2 | Dado B3 |

## Cenários BDD
> ### Cenário Acessiblidade
> Durante um trajeto na rua, eu experimento o cenário de Acessibilidade e Desempenho. Dado que eu estou utilizando um celular mais antigo e dependo de uma conexão de internet móvel instável, quando eu tento navegar pelas informações e consultar o endereço final do ponto de descarte, então a interface deve carregar rapidamente devido ao seu design leve e deve possuir recursos de acessibilidade, como alto contraste, para que eu consiga ler a tela sem dificuldades sob a luz do sol.

> ### Cenário Busca no Mapa
> Ao tentar decidir onde levar esses materiais, eu vivencio o cenário de Busca Imparcial no Mapa. Dado que eu estou na tela inicial do sistema e preciso me livrar de um computador antigo, quando eu acesso o sistema de localização e filtro a busca para encontrar os locais que aceitam esse tipo de resíduo, então a plataforma deve me recomendar os pontos de coleta baseando-se apenas em critérios neutros, como a minha proximidade geográfica e a capacidade atual de recebimento do estabelecimento, garantindo que o algoritmo não favoreça grandes empresas de forma artificial.

> ### Cenário Consulta de Materiais
> Ao tentar descobrir as regras do local, eu vivencio o cenário de Consulta Detalhada de Materiais Aceitos. Dado que eu localizei um ponto de coleta próximo à minha residência no mapa da plataforma, quando eu toco no ícone do estabelecimento para verificar os detalhes, então a aplicação deve abrir um painel exibindo uma lista clara e específica dos tipos de resíduos aceitos e não aceitos naquele local, para que eu não perca a viagem tentando entregar um equipamento fora dos padrões aceitos pela capacidade do ponto.

> ### Cenário Limite de Capacidade
> Ao interagir com a aplicação, eu vivencio o cenário de Gerenciamento e Prevenção de Sobrecarga no Ponto de Coleta. Dado que o meu estabelecimento está atingindo o limite de sua capacidade de armazenamento de resíduos, quando eu atualizo o status de lotação no painel de gerenciamento da plataforma, então o sistema deve atualizar imediatamente a situação do meu ponto no mapa e otimizar o fluxo de encaminhamento, redirecionando os novos descartes da população para outros pontos disponíveis na região para evitar a sobrecarga e manter a organização da coleta.

> ### Cenário Manuseio de Resíduos
> Enquanto separo os itens, eu me deparo com o cenário de Manuseio Seguro de Resíduos Perigosos. Dado que eu encontrei uma bateria de celular estufada e tenho medo de que ela vaze ou exploda, quando eu abro a aba de educação e conscientização para procurar ajuda, então o aplicativo deve me exibir imediatamente orientações claras e cartilhas que foram obrigatoriamente validadas por especialistas ambientais, apresentando alertas de segurança em destaque para que eu não coloque a minha saúde em risco durante o manuseio.

> ### Cenário Privacidade no Registro
> Após conseguir levar o equipamento até o local indicado, eu passo pelo cenário de Privacidade no Registro de Descarte. Dado que eu entreguei os eletrônicos no ponto de coleta e desejo ajudar nas estatísticas do projeto, quando eu abro a funcionalidade para registrar a realização do descarte na plataforma, então o sistema deve me permitir concluir essa ação de forma totalmente anônima, exigindo apenas dados estritamente necessários (como o tipo e o volume de lixo), assegurando que meus dados não serão rastreados ou repassados a terceiros.

> ### Cenário Registro de Descarte
> Eu passo então pelo cenário de Registro e Confirmação de Descarte. Dado que eu cheguei ao ponto de coleta sugerido com minha sacola de eletrônicos e finalizei o descarte, quando eu acesso o aplicativo para documentar a ação de forma anônima, então o sistema deve registrar a quantidade e o tipo de material que entreguei, processando a entrada rapidamente e me exibindo uma mensagem de confirmação para que eu sinta que concluí meu objetivo de ajudar na gestão sustentável.

## US Funcionais v2
| Coluna 1 | Coluna 2 | Coluna 3 |
| --- | --- | --- |
| Dado A1 | Dado A2 | Dado A3 |
| Dado B1 | Dado B2 | Dado B3 |
