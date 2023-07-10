import Jwt from "jsonwebtoken";

const privateKey = "secretkey";

export function signJwt(payload, expiresIn) {
	return Jwt.sign(payload, privateKey, {
		expiresIn: expiresIn,
	});
}

// verify Jwt
export function verifyJwt(token) {
	try {
		const decoded = Jwt.verify(token, privateKey);
		return { payload: decoded };
	} catch (error) {
		return {
			payload: null,
		};
	}

	//or

	// Jwt.verify(token, privateKey, (err, decodedinfo) => {
	// 	if (err)
	// 		return {
	// 			payload: null,
	// 		};
	// 	else {
	// 		return {
	// 			payload: decodedinfo,
	// 		};
	// 	}
	// });
}
