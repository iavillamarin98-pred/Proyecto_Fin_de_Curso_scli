package ec.edu.uteq.scli.auth_service.service;

import ec.edu.uteq.scli.auth_service.dto.AuthUserResponse;
import ec.edu.uteq.scli.auth_service.dto.LoginRequest;
import ec.edu.uteq.scli.auth_service.dto.LoginResponse;
import ec.edu.uteq.scli.auth_service.exception.AccountBlockedException;
import ec.edu.uteq.scli.auth_service.exception.AccountDisabledException;
import ec.edu.uteq.scli.auth_service.exception.InvalidCredentialsException;
import ec.edu.uteq.scli.auth_service.security.CustomUserDetails;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.username().trim(),
                            request.password()));

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            String accessToken = jwtService.generarAccessToken(userDetails);

            List<String> roles = userDetails
                    .getAuthorities()
                    .stream()
                    .map(authority -> authority.getAuthority())
                    .filter(authority -> authority.startsWith("ROLE_"))
                    .map(authority -> authority.substring("ROLE_".length()))
                    .sorted()
                    .toList();

            List<String> permisos = userDetails
                    .getAuthorities()
                    .stream()
                    .map(authority -> authority.getAuthority())
                    .filter(authority -> !authority.startsWith("ROLE_"))
                    .sorted()
                    .toList();

            AuthUserResponse usuario = new AuthUserResponse(
                    userDetails.getUsuarioId(),
                    userDetails.getPerfilId(),
                    userDetails.getUsername(),
                    roles,
                    permisos);

            return new LoginResponse(
                    "Bearer",
                    accessToken,
                    jwtService
                            .obtenerExpiracionAccessTokenSegundos(),
                    usuario);

        } catch (LockedException exception) {
            throw new AccountBlockedException();

        } catch (DisabledException exception) {
            throw new AccountDisabledException();

        } catch (BadCredentialsException exception) {
            throw new InvalidCredentialsException();
        }
    }
}