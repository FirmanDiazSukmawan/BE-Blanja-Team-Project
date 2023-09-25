module.exports = {
  // isAdmin: (req, res, next) => {
  //     if (req.APP_DATA.tokenDecode.role === 0) {
  //         next();
  //     }
  //     else res.json({
  //         message: "Halaman hanya bisa di akses oleh admin"
  //     });
  // },
  // isUser: (req, res, next) => {
  //     if (req.APP_DATA.tokenDecode.role === 1) {
  //         next();
  //     }
  //     else res.json({
  //         message: "Halaman hanya bisa di akses oleh user"
  //     });
  // }

  isSeller: (req, res, next) => {
    if (req?.payload?.seller?.role === "seller") {
      next();
    } else
      res.json({
        message: "Halaman hanya bisa di akses oleh admin",
      });
  },
  isCustomer: (req, res, next) => {
    if (req?.payload?.customer?.role === "customer") {
      next();
    } else
      res.json({
        message: "Halaman hanya bisa di akses oleh user",
      });
  },
};
