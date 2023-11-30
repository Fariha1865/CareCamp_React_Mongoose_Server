const logOut = async (req, res) => {

    const user = req.body;
    // console.log("logging out" + user);

    res.clearCookie('token', { maxAge: 0, sameSite: 'none', secure: true })
        .send({ success: true })

}

module.exports = logOut