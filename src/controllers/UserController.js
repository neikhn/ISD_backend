const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: "Parameter Required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid Email",
      });
    } else if (password !== confirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid Confirm Password",
      });
    }
    const response = await UserService.createUser(req.body);
    if (response.status === "ERR") {
      console.log(response);
      return res.status(409).json(response); // Conflict: email đã tồn tại
    }
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (request, respond) => {
  try {
    const { email, password } = request.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return respond.status(200).json({
        status: "ERR",
        message: "Parameter(s) required",
      });
    } else if (!isCheckEmail) {
      return respond.status(200).json({
        status: "ERR",
        message: "Invalid email",
      });
    }
    const response = await UserService.loginUser(request.body);
    const { refresh_token, ...newReponse } = response;
    respond.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });
    return respond.status(200).json({ ...newReponse, refresh_token });
  } catch (error) {
    return respond.status(404).json({
      message: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    let token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (request, respond) => {
  try {
    const userId = request.params.id;
    if (!userId) {
      return respond.status(200).json({
        status: "ERR",
        message: "userId required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return respond.status(200).json(response);
  } catch (error) {
    return respond.status(404).json({
      message: error,
    });
  }
};

const deleteMany = async (request, respond) => {
  try {
    const ids = request.body.ids;
    if (!ids) {
      return respond.status(200).json({
        status: "ERR",
        message: "ids required",
      });
    }
    const response = await UserService.deleteManyUser(ids);
    return respond.status(200).json(response);
  } catch (error) {
    return respond.status(404).json({
      message: error,
    });
  }
};

const getAllUser = async (request, respond) => {
  try {
    const response = await UserService.getAllUser();
    return respond.status(200).json(response);
  } catch (error) {
    return respond.status(404).json({
      message: error,
    });
  }
};

const getDetailsUser = async (request, respond) => {
  try {
    const userId = request.params.id;
    if (!userId) {
      return respond.status(200).json({
        status: "ERR",
        message: "userId required",
      });
    }
    const response = await UserService.getDetailsUser(userId);
    return respond.status(200).json(response);
  } catch (error) {
    return respond.status(404).json({
      message: error,
    });
  }
};

const logoutUser = async (request, respond) => {
  try {
    respond.clearCookie("refresh_token");
    return respond.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (error) {
    return respond.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
  logoutUser,
  deleteMany,
  logoutUser,
};
