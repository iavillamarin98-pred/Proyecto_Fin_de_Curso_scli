
# reservas-solicitudes-service

Microservicio SCLI encargado de gestionar solicitudes de reserva, reservas confirmadas,
disponibilidad y bloqueos de agenda de los laboratorios.

## Requisitos

- Java 21.
- CockroachDB local o disponible mediante Docker Compose.
- Puerto SQL `26260` disponible para CockroachDB.
- Puerto `8084` disponible para el microservicio.

## URL base

```text
http://localhost:8084
```

## Preparación local

Los comandos de Docker Compose deben ejecutarse desde la raíz del repositorio.
Los comandos Maven deben ejecutarse desde `reservas-solicitudes-service`.

### 1. Levantar la base de datos

```powershell
docker compose up -d cockroach-reservas cockroach-reservas-init
```

La base utiliza esta configuración:

- Motor: CockroachDB
- Contenedor: `scli-cockroach-reservas`
- Host: `localhost`
- Puerto SQL: `26260`
- Puerto administrativo: `8091`
- Base de datos: `reservas_db`
- Usuario: `root`
- Contraseña: vacía en desarrollo local inseguro

### 2. Verificar el contenedor

```powershell
docker compose ps cockroach-reservas cockroach-reservas-init
```

Antes de iniciar el microservicio, el contenedor debe aparecer saludable (`healthy`).

### 3. Compilar

```powershell
.\mvnw.cmd clean compile -DskipTests
```

### 4. Ejecutar

```powershell
.\mvnw.cmd spring-boot:run
```

Flyway ejecutará automáticamente las migraciones disponibles en
`src/main/resources/db/migration`.

### 5. Verificar la salud

Abrir:

```text
http://localhost:8084/actuator/health
```

## Dependencias para operaciones reales

Para crear o actualizar solicitudes reales también deben estar disponibles:

- `usuarios-service` en `http://localhost:8082`
- `academico-laboratorios-service` en `http://localhost:8083`

El microservicio consulta esos servicios para validar perfiles, docentes, laboratorios,
materias y períodos lectivos.

## Detener la base de datos

Desde la raíz del repositorio, conservando el volumen y sus datos:

```powershell
docker compose stop cockroach-reservas
```

La eliminación del volumen global debe coordinarse con el equipo para no afectar el
entorno compartido de Docker Compose.
