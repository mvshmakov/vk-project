## Приложение для VK Project
#### По команде `npm run bootstrap` из корня параллельно запускаются webpack-watch и nodemon (ts-node) для, соответственно, клиента (8080 порт) и сервера (3000 порт). Можно запустить каждое приложение по отдельности (см. npm scripts)

`npm-check-updates`

## Глава про Docker

#### Поднимаем инстанс docker-compose:
##### Из корня проекта: `docker-compose up`

#### Лезем в контейнер:
##### 1) `docker ps`
##### CONTAINER ID
##### <container_id>
##### 2) `docker exec -it <container_id> bash`

##### Убиваем все процессы: `docker rm $(docker ps -a -q)`
##### Убиваем все образы: `docker rmi $(docker images -q)`
##### Всё вместе: `docker rm $(docker ps -a -q) && docker rmi $(docker images -q)`


## Техническая инфа:
#### Автогенерация тайпингов из JSON: `https://transform.now.sh/json-to-ts-interface/`

## Конвенции:
#### Ветку в гите именуем как <task type>/<ticket>-<brief description>. Пример: feature/VKPROJECT-1-new-convention

#### Префиксуем типы через T, интерфейсы через I
