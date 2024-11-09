import { Header as FormHeader, FormContainer, FormHOC, Form, SubmitButton, FormGroup } from '../_components/form'
import { requestResetPassword } from '../_actions/authActions'

const Page = () => {
  return (
    <FormHOC serverAction={requestResetPassword}>
      <FormContainer>
        <FormHeader
          title="Recupera tu cuenta"
          description="Ingresa tu correo electronico para que podamos enviar un email con las instrucciones para que puedas recuperar el acceso a tu cuenta."
        />

        <Form>
          <FormGroup>
            <label htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Proporciona un correo electronico"
              name="email"
              id="email"
              required
            />
          </FormGroup>

          <SubmitButton>Enviar email de recuperación</SubmitButton>
        </Form>
      </FormContainer>
    </FormHOC>
  );
}

export default Page