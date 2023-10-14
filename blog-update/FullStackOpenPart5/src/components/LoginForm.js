const LoginForm = ({ username, setUserName, password, setPassword, handleLogin }) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          id='username_input'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>

      <div>
        Password
        <input
          id='password_input'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login_button' type='submit'>Log in</button>
    </form>
  </div>
)

export default LoginForm