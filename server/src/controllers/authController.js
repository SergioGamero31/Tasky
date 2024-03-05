const authService = require('../services/authService');

async function signup(req, res) {
  try {
    const { email, userName, password } = req.body;

    if (!email || !userName || !password) {
      return res.status(400).json({ error: 'Los campos son requeridos' });
    }

    const existingUser = await authService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electronico ya está en uso' });
    }

    const newUser = await authService.createUser(email, userName, password);
    // Generar tokens
    /* const accessToken = authService.generateAccessToken(newUser._id);
    const refreshToken = authService.generateRefreshToken(newUser._id);
    res.status(200).json({ accessToken, refreshToken });*/
    res.status(200).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error en el registro' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Los campos son requeridos' });
    }

    const user = await authService.authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const accessToken = authService.generateAccessToken(user._id);
    const refreshToken = authService.generateRefreshToken(user._id);
    res.status(200).json({
      accessToken,
      refreshToken,
      user: { id: user._id, userName: user.userName, email: user.email }
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
}

async function refreshToken(req, res) {
  try {
    const refreshToken = req.body.refreshToken;

    const userId = authService.verifyRefreshToken(refreshToken);
    if (!userId) {
      return res.status(401).json({ error: 'Token de actualización inválido' });
    }

    const newAccessToken = authService.generateAccessToken(userId);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error en la actualización del token:', error);
    res.status(500).json({ error: 'Error en la actualización del token' });
  }
}

module.exports = {
  signup,
  login,
  refreshToken
};
