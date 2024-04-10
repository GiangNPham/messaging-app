var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/userSchema");
const { check, validationResult } = require("express-validator");

const requireAuth = require("../middleware/authMiddleware");
const {
  getConversationsAndUsers,
  updatePassword,
  updateUsername,
} = require("../controllers/userControllers");

router.get("/", requireAuth, getConversationsAndUsers);
router.patch("/password", requireAuth, updatePassword);
router.patch("/username", requireAuth, updateUsername);

// router.patch(
//   "/:id/password",
//   check("newPassword", "Not long enough, min 8 characters").isLength({
//     min: 8,
//   }),
//   async (req, res, next) => {
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//       try {
//         const hashedPs = await bcrypt.hash(req.body.newPassword, 12);

//         const newDoc = await User.findByIdAndUpdate(req.params.id, {
//           password: hashedPs,
//         });
//         res.json(newDoc);
//       } catch (err) {
//         res.status(400).json(err);
//       }
//     } else res.status(400).json({ err: result.array() });
//   }
// );

// router.patch(
//   "/:id/username",
//   check("newUsername", "Not a valid username").notEmpty(),
//   async (req, res) => {
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//       try {
//         const newDoc = await User.findByIdAndUpdate(
//           req.params.id,
//           {
//             username: req.body.newUsername,
//           },
//           {
//             new: true,
//           }
//         );
//         res.json(newDoc);
//       } catch (err) {
//         res.status(400).json({ err });
//       }
//     } else res.json({ err: result.array() });
//   }
// );

module.exports = router;
