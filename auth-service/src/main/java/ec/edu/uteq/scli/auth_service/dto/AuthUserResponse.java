package ec.edu.uteq.scli.auth_service.dto;

import java.util.List;
import java.util.UUID;

public record AuthUserResponse(
        UUID id,
        UUID perfilId,
        String username,
        List<String> roles,
        List<String> permisos) {
}