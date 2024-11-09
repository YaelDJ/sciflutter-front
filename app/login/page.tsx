import { FormHOC, FormContainer, Header as FormHeader, Form, Link as FormLink, MoreOptions as FormMoreOptions, SubmitButton as FormSubmitButton, FormGroup } from "../_components/form";
import { login } from "../_actions/authActions";
import Link from "next/link";

const Page: React.FC = async () => {
  return (
    <FormHOC serverAction={login}>
      <FormContainer>
        <FormHeader
          title="Descubre más allá"
          description="Inicia sesion para poder acceder a todas las funciones disponibles."
        />

        <Form>
          <FormGroup>
            <label htmlFor="email">Correo electronico</label>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              id="email"
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              required
            />
          </FormGroup>

          <FormSubmitButton>Iniciar sesión</FormSubmitButton>
        </Form>
      </FormContainer>

      <FormMoreOptions>
        <FormLink>
          ¿Aún no estas registrado?{" "}
          <Link href="/signup" type="icon">
            Registrate
          </Link>
        </FormLink>

        <FormLink>
          ¿Olvidaste tu contraseña?{" "}
          <Link href="/forgot-password" type="icon">
            Restablecer contraseña
          </Link>
        </FormLink>
      </FormMoreOptions>
    </FormHOC>
  );
}

export default Page