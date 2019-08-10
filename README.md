## Web интерфейс для VK Project
#### Запуск приложения:
##### 1) Дев-режим: npm run bootstrap 
##### 2) Прод-режим: npm run bootstrap:prod

#### На ебаной винде:
##### `npm i && cd ./node_modules && mklink /D @ ../src && npm run start`
##### В будущем, по-хорошему, надо бы postinstall'ом дёргать shell-скрипт, который линкует и винду, и юнихи (см. `./scripts/bootstrap.sh`)

npm-check-updates


## Глава про Docker

#### Лезем в контейнер:
##### 1) `docker ps`
##### > CONTAINER ID
##### > <container_id>
##### 2) `docker exec -it <container_id> bash`

##### Убиваем все процессы: `docker rm $(docker ps -a -q)`
##### Убиваем все образы: `docker rmi $(docker images -q)`
##### Всё вместе: `docker rm $(docker ps -a -q) && docker rmi $(docker images -q)`


## Техническая инфа:
#### Автогенерация тайпингов из JSON: `https://transform.now.sh/json-to-ts-interface/`

Префиксуем типы через T, интерфейсы через I
