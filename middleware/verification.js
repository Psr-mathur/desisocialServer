import { verifyJwt } from "../utils/jwt.utils.js";

const verification = (req, res, next) => {
	const { accessToken } = req.cookies;
	if (!accessToken) {
		return res.status(401).send("Not Logged In!");
	}
	const { payload } = verifyJwt(accessToken);

	//payload can be null check verifyjwt

	if (!payload) {
		return res.status(403).json("Token is not Valid.");
	}

	req.decodedUser = payload;
	return next();
};

export default verification;
