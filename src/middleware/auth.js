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
    if (req?.payload?.users?.role === "seller") {
      next();
    } else
      res.json({
        message: "Halaman hanya bisa di akses oleh Seller",
      });
  },
  isCustomer: (req, res, next) => {
    if (req?.payload?.users?.role === "customer") {
      next();
    } else
      res.json({
        message: "Halaman hanya bisa di akses oleh user",
      });
  },
};