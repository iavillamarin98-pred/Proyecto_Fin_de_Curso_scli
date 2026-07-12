INSERT INTO usuarios_auth (
    id,
    perfil_id,
    username,
    email,
    password_hash,
    activo,
    cuenta_bloqueada,
    intentos_fallidos,
    password_actualizado_en,
    creado_en,
    actualizado_en
)
VALUES (
    gen_random_uuid(),
    gen_random_uuid(),
    'admin',
    'admin@scli.local',
    '$2a$12$pD9EUX0uJJhF1.uTQyF07OVmyAIwIDA2neWwTRJe5CRs3fTPAuZLi',
    TRUE,
    FALSE,
    0,
    current_timestamp(),
    current_timestamp(),
    current_timestamp()
)
ON CONFLICT (username) DO NOTHING;

INSERT INTO usuarios_roles (
    usuario_id,
    rol_id,
    asignado_en
)
SELECT
    u.id,
    r.id,
    current_timestamp()
FROM usuarios_auth u
JOIN roles r
    ON r.codigo = 'ADMINISTRADOR'
WHERE u.username = 'admin'
ON CONFLICT (usuario_id, rol_id) DO NOTHING;