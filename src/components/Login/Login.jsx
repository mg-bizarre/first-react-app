import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import s from './Login.module.css';
import styles from '../common/FormsControls/FormsControls.module.css';
const maxLength = maxLengthCreator(25);
const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} action='' className={s.form}>
      {createField(s.input__block, s.input, 'email', 'email', 'text', [required, maxLength], Input)}
      {createField(s.input__block, s.input, 'password', 'password', 'password', [(required, maxLength)], Input)}
      {createField(s.checkbox__block, s.checkbox, null, 'rememberMe', 'checkbox', [], 'input', 'remember me')}
      {props.error && <div className={styles.formSummaryError}>{props.error}</div>}
      <div className={s.button__block}>
        <button className={s.button} type='submit'>
          Log in
        </button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  //a unique name for the form
  form: 'login',
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };
  if (props.isAuth) {
    return <Redirect to='/profile' />;
  }
  return (
    <div className={s.login}>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
