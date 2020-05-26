echo '##################### Creating Aplication User ######################'

mongo ${DB_COLLECTION} \
    --host ${MONGO_HOST} \
    --port ${MONGO_PORT} \
    -u ${MONGO_ROOT_USER} \
    -p ${MONGO_ROOT_PASSWORD} \
    --authenticationDatabase admin \
    --eval "use ${DB_COLLECTION}; db.createUser({user: '${DB_USER}', pwd: '${DB_PASSWORD}', roles:[
        {role:'dbAdmin', db: '${DB_COLLECTION}'},
        {role:'dbOwner', db: '${DB_COLLECTION}'},
        {role:'read', db: '${DB_COLLECTION}'},
        {role:'readWrite', db: '${DB_COLLECTION}'},
        {role:'userAdmin', db: '${DB_COLLECTION}'},
    ]});"
    --eval "use ${DB_COLLECTION_TEST}; db.createUser({user: '${DB_USER}', pwd: '${DB_PASSWORD}', roles:[
        {role:'dbAdmin', db: '${DB_COLLECTION_TEST}'},
        {role:'dbOwner', db: '${DB_COLLECTION_TEST}'},
        {role:'read', db: '${DB_COLLECTION_TEST}'},
        {role:'readWrite', db: '${DB_COLLECTION_TEST}'},
        {role:'userAdmin', db: '${DB_COLLECTION_TEST}'},
    ]});"