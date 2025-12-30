"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secretKey = process.env.SECRETKEY;
// export const login = async (req: Request, res: Response) => {
//   const { usernameOrEmail, password } = req.body;
//   //   const validate = loginInputs.safeParse({ usernameOrEmail, password });
//   //   if (!validate.success) {
//   //     return res.status(400).json({ msg: "Invalid Inputs" });
//   //   }
//   try {
//     // const user = await UserModel.findOne({
//     //   $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
//     // }).exec();
//     // if (!user) {
//     //   return res.status(404).json({ msg: "User not found" });
//     // }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ msg: "Invalid password" });
//     }
//     const secretKey = process.env.SECRETKEY;
//     if (!secretKey) {
//       return res.status(500).json({ msg: "JWT secret key is not defined" });
//     }
//     const token = jwt.sign(
//       { name: user.companyName, id: user._id, role: user.role },
//       secretKey,
//       { expiresIn: "12h" }
//     );
//     // Set the JWT token as a cookie for localhost
//     // res.setHeader(
//     //   'Set-Cookie',
//     //   cookie.serialize('token', token, {
//     //     httpOnly: true,
//     //     maxAge: 3600,
//     //     sameSite: 'none', // 'lax' is generally safe for CSRF protection
//     //     secure: true, // Ensure this is served over HTTPS in production
//     //     path: '/',
//     //     domain: '.603-coworking-backend.vercel.app',
//     //   })
//     // );
//     // return res.status(200).json({ msg: 'User signed in', user, token });
//     // ✅ Send token in JSON instead of setting cookie
//     return res.status(200).json({ msg: "User signed in", user, token });
//   } catch (e) {
//     console.error(e);
//     return res
//       .status(500)
//       .json({ msg: "Internal server error12345", error: e });
//   }
// };
// export const logout = async (req: Request, res: Response) => {
//   try {
//     // res.setHeader(
//     //   'Set-Cookie',
//     //   cookie.serialize('token', '', {
//     //     httpOnly: true,
//     //     expires: new Date(0), // Expire the cookie
//     //     sameSite: 'none', // 'lax' is generally safe for CSRF protection
//     //     secure: true, // Ensure this is served over HTTPS in production
//     //     path: '/', // Match this with logout
//     //     domain: '.603-coworking-backend.vercel.app',
//     //   })
//     // );
//     return res.status(200).json({ msg: "User logged out successfully" });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// };
// export const createuser = async (req: Request, res: Response) => {
//   const body = req.body;
//   const validate = createuserInputs.safeParse(body);
//   if (!validate.success) {
//     return res.status(400).json({ msg: "Invalid Inputs" });
//   }
//   try {
//     const {
//       companyName,
//       email,
//       password,
//       phone,
//       username,
//       country,
//       state,
//       zipcode,
//       city,
//       monthlycredits,
//       location,
//       member,
//       role,
//     } = body;
//     const usernameExists = await UserModel.findOne({ username });
//     if (usernameExists) {
//       return res.status(409).json({ msg: "Username exists" });
//     }
//     const emailExists = await UserModel.findOne({ email });
//     if (emailExists) {
//       return res.status(409).json({ msg: "Email exists" });
//     }
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await UserModel.create({
//       companyName,
//       username,
//       email,
//       password: hashedPassword,
//       phone,
//       role: role,
//       kyc: false,
//       country,
//       state,
//       zipcode,
//       location,
//       city,
//       creditsleft: monthlycredits,
//       monthlycredits,
//       member,
//       createdAt: Date.now(),
//     });
//     const secretKey = process.env.SECRETKEY;
//     if (!secretKey) {
//       console.error("JWT secret key is not defined");
//       return res.status(500).json({ msg: "JWT secret key is not defined" });
//     }
//     const token = jwt.sign({ id: user._id, companyName }, secretKey, {
//       expiresIn: "1h",
//     });
//     return res
//       .status(201)
//       .json({ msg: "User created", jwt: token, user: user.companyName });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ msg: "Internal server error1" });
//   }
// };
