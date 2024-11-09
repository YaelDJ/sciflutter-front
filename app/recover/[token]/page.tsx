import { resetPassword } from "@/app/_actions/authActions";
import { Form, FormContainer, FormGroup, FormHOC, Header as FormHeader, SubmitButton } from "@/app/_components/form";

interface Props{
  params: {
    token: string
  }
}

const Page: React.FC<Props> = ({ params }) => {
  return (
    <FormHOC serverAction={resetPassword}>
      <FormContainer>
        <FormHeader
          title="Recupera tu cuenta"
          description="Ingresa tu correo electronico para que podamos enviar un email con las instrucciones para que puedas recuperar el acceso a tu cuenta."
        />

        <Form>
          <FormGroup>
            <label htmlFor="password">Nueva contraseña</label>
            <input
              type="password"
              placeholder="Proporciona un correo electronico"
              name="password"
              id="password"
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="passwordConfirm">
              Confirmar contraseña
            </label>
            <input
              type="password"
              placeholder="Proporciona un correo electronico"
              name="passwordConfirm"
              id="passwordConfirm"
              required
            />
          </FormGroup>

          <input type="hidden" value={params.token} id="token" name="token" />

          <SubmitButton>Enviar email de recuperación</SubmitButton>
        </Form>
      </FormContainer>
    </FormHOC>
  );
};

export default Page;
