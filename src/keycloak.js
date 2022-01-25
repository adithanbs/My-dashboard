import Keycloak from 'keycloak-js';

const keycloakConfig = {
    // 'url': process.env.NODE_ENV === 'development' ? 'http://localhost:8080/auth/' : 'https://iam.shifteasy.com/auth',
    'url': 'https://iam.shifteasy.com/auth',
    'realm': 'shifteasy',
    'clientId': 'summit-indoglobalb2b'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;