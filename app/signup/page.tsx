import { Form, FormContainer, FormGroup, FormHOC, Header as FormHeader, Link as FormLink, MoreOptions as FormMoreOptions, SubmitButton as FormSubmitButton } from '../_components/form';
import { signup } from '../_actions/authActions';
import Link from 'next/link';

const Page: React.FC = async () => {
  return (
    <FormHOC serverAction={signup}>
      <FormContainer>
        <FormHeader
          title="Descubre más alla"
          description="Desbloquea todas las funcionalidades creando una cuenta, es rapido y gratis"
        />

        <Form>
          <FormGroup>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              id="name"
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="lastName">Lastname</label>
            <input
              type="text"
              placeholder="Your lastname"
              name="lastName"
              id="lastName"
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              id="email"
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="New password"
              name="password"
              id="password"
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="passwordConfirm">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              name="passwordConfirm"
              id="passwordConfirm"
              required
            />
          </FormGroup>

          <FormSubmitButton>Sign up</FormSubmitButton>
        </Form>
      </FormContainer>

      <FormMoreOptions>
        <FormLink>
          You have an account?{" "}
          <Link href="/login" type="icon">
            Login
          </Link>
        </FormLink>
      </FormMoreOptions>
    </FormHOC>
  );
}

export default Page