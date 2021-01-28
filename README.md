# Kafka-node example
##### Exemplo de utilização do kafka utilizando node

## Setup

Inicie o broker do kafka juntamente com o zookeeper e interface web:
```shell
docker-compose up -d -f ./kafka/docker-compose.yaml
```

Inicie o comsumidor das mensagens do kafka:
```shell
npm run dev --prefix ./svc-certificados/
```

Inicie a api para se comunicar com o kafka:
```shell
npm run dev --prefix ./api/
```

## Instruções

Para testar o sistema entre no endereço `localhost:3333`, a api emitirá uma mensagem para o kafka rodando em localhost e retornará {ok:true}, depois disso o kafka enviará a mensagem para o serviço consumidor. Este por sua vez apenas logará a mensagem recebida.