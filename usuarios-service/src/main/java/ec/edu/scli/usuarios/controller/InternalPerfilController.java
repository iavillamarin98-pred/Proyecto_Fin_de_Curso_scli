package ec.edu.scli.usuarios.controller;

import ec.edu.scli.usuarios.dto.perfil.PerfilExistsResponse;
import ec.edu.scli.usuarios.service.PerfilService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/internal/perfiles")
public class InternalPerfilController {

    private final PerfilService perfilService;

    private final String internalApiKey;

    public InternalPerfilController(
            PerfilService perfilService,
            @Value("${app.internal-api-key}") String internalApiKey
    ) {
        this.perfilService = perfilService;
        this.internalApiKey = internalApiKey;
    }

    @GetMapping("/{perfilId}/exists")
    public ResponseEntity<PerfilExistsResponse> verificarExistencia(
            @PathVariable UUID perfilId,
            @RequestHeader(
                    value = "X-Internal-Api-Key",
                    required = false
            ) String apiKey
    ) {

        if (apiKey == null || !internalApiKey.equals(apiKey)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        PerfilExistsResponse response =
                perfilService.verificarExistencia(perfilId);

        return ResponseEntity.ok(response);
    }
}