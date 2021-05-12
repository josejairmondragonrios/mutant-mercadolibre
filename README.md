# Test Mutantes - MercadoLibre

Prueba/Examen MercadoLibre.


## Requisitos
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [nodejs](https://nodejs.org/es/)
- [npm](https://www.npmjs.com/)

# Instalación

## Instalar la base de datos
Ir a la ruta "./database/" y ejecutar:

```bash
docker-compose up -d
```

## Instalación de los paquetes/dependencias

Ir a la ruta "./lambdas/mutant_lambda/" y ejecutar:

```bash
npm install
```

Ir a la ruta "./lambdas/stats_lambda/" y ejecutar:
```bash
npm install
```

## Ejecutar pruebas unitarias

### Instalar el Sonarqube
Ir a la ruta "./sonarqube/" y ejecutar:

```bash
docker-compose up -d
```

### Ejecutar pruebas en el proyecto mutant_lambda
Ir a la ruta "./lambdas/mutant_lambda/" y ejecutar:

```bash
npm run coverage
```

```bash
npm run sonar-scanner
```

Ir al link [http://localhost:9000/](http://localhost:9000/) y loguearse (user: admin, pass: admin)

### Ejecutar pruebas en el proyecto stats_lambda
Ir a la ruta "./lambdas/stats_lambda/" y ejecutar:
```bash
npm run coverage
```

```bash
npm run sonar-scanner
```

Ir al link [http://localhost:9000/](http://localhost:9000/) y loguearse (user: admin, pass: admin)