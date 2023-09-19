  //Cambio de contraseña
  router.post("/", async (req, res) => {
    try {
      const { password, password2, emailToken } = req.body;
      if (password == password2) {
        const findUser = await User.findOne({ email: emailToken });
        console.log(findUser.name);
  
        /**Se encripta la nueva contraseña */
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newPass = hashPassword;
        const updatedPass = await User.updateOne(
          { email: emailToken },
          { $set: { password: newPass } }
        );
  
        res.json(updatedPass);
      } else {
        res.status(500).json({
          mensaje: "Las constraseñas no son iguales.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  });


module.exports = router;